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

        if (!searchInput) {
            return false;
        }

        const prevState = this.state;
        prevState.searchFieldInput = searchInput;

        this.setState(prevState);

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

    searchResults() {
        return this.state.searchResults.map((item, i) => {
            return (
                <div key={i} className="SidePanel__search-result" onClick={ () => this.loadNote(item.id) }>
                    { item.name }
                </div>
            );
        });
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