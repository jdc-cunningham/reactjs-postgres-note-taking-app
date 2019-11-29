import React, { Component } from 'react';
import './SidePanel.scss';
import axios from 'axios';

class SidePanel extends Component {
    state = {
        searchFieldInput: "",
        searchResults: this.getPreviouslySearchedNotes(),
        activeNoteId: this.props.activeNoteId
    }

    apiBasePath = 'http://localhost:5001/api';
    searchNotes = this.searchNotes.bind(this);
    inputSearch = React.createRef();

    getPreviouslySearchedNotes() {
        const previouslySearchedNotes = localStorage.getItem('rjs-pg-notes');
        return previouslySearchedNotes ? previouslySearchedNotes.searchedNotes : [];
    }

    updateLocalStorage(key, val) {
        if (!localStorage.getItem('rjs-pg-notes')) {
            localStorage.setItem('rjs-pg-notes', {});
        }

        localStorage.notes[key] = val;
    }

    searchNotes() {
        const searchInput = this.inputSearch.current.value
        const data = {};
        const prevState = this.state;
        const prevSearch = prevState.searchFieldInput;
        prevState.searchFieldInput = searchInput;

        this.setState(prevState);

        if (!searchInput || searchInput === prevSearch) {
            return false;
        }

        data.searchTerm = searchInput;

        axios.post(this.apiBasePath + '/search-notes/', data)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    this.setState({
                        searchFieldInput: searchInput,
                        searchResults: response.data
                    });
                }
            })
            .catch((error) => {
                alert('Failed to search');
            });
    }

    loadNote(noteId) {
        this.props.updateActiveNoteId(noteId);
    }

    deleteNote(noteId) {
        if (window.confirm("Delete this note?")) {
            const data = {noteId : noteId};
            axios.post(this.apiBasePath + '/delete-note/', data)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    this.setState({
                        searchFieldInput: this.state.searchFieldInput,
                        searchResults: this.state.searchResults.filter((item, i) => {
                            return item.id !== noteId
                        })
                    });
                }
            })
            .catch((error) => {
                alert('Failed to delete note');
            });
        }
    }

    searchResults() {
        const noNotesString = this.state.searchFieldInput.length ? "No notes" : "";
        if (!this.state.searchResults.length) {
            return(
                <div className="SidePanel__search-result no-hover">
                    <span className="SidePanel__note-name">
                        {noNotesString}
                    </span>
                </div>
            );
        } else {
            return this.state.searchResults.map((item, i) => {
                return (
                    <div key={i} className="SidePanel__search-result">
                        <span className="SidePanel__note-name" onClick={ () => this.loadNote(item.id) }>{ item.name }</span>
                        <button type="button" onClick={ () => this.deleteNote(item.id) }>X</button>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="SidePanel">
                <input type="text" placeholder="search" ref={ this.inputSearch } value={ this.state.searchFieldInput || "" } onChange={ this.searchNotes } />
                <div className="SidePanel__search-results">
                    { this.searchResults() }
                </div>
            </div>
        );
    }
}

export default SidePanel;