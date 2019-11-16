import React, { Component } from 'react';
import './ContentPanel.scss';
import axios from 'axios';

class ContentPanel extends Component {
    state = {
        newNote: {
            name: "",
            body: ""
        }
    }

    apiBasePath = 'http://localhost:5001/api';
    noteNameInput = React.createRef();
    noteContentTextarea = React.createRef();
    updateNewNote = this.updateNewNote.bind(this);
    createNewNote = this.createNewNote.bind(this);
    saveNote = this.saveNote.bind(this);

    updateNewNote() {
        const newNoteName = this.noteNameInput.current.value;
        const newNoteBody = this.noteContentTextarea.current.value;
        this.setState({
            newNote: {
                name: newNoteName,
                body: newNoteBody
            }
        });
    }

    // componentDidUpdate() {
    //     console.log('yes');
    // }

    saveNote() {

    }

    clearNewNoteFields() {
        this.setState({
            newNote: {
                name: "",
                body: ""
            }
        });
    }

    createNewNote() {
        const noteName = this.state.newNote.name;
        const noteBody = this.state.newNote.body;

        if (!noteName || !noteBody) {
            alert('Please make sure both name and content are not empty');
        } else {
            const data = {};
            data.noteName = noteName;
            data.noteContent = noteBody;

            axios.post(this.apiBasePath + '/create-note/', data)
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        alert('Created new note');
                        this.clearNewNoteFields();
                    } else {
                        alert('Failed to create new note');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    createNewNoteUI() {
        return(
            <div className="ContentPanel__interface-group">
                <h2>New Note</h2>
                <div className="ContentPanel__top-bar">
                    <div className="ContentPanel__top-bar-display">
                        <input
                            type="text"
                            ref={ this.noteNameInput }
                            className="ContentPanel__top-bar-title-text"
                            value={ this.state.newNote.name || '' }
                            placeholder="note name"
                            onChange={ this.updateNewNote } />
                        <button type="button" onClick={ this.createNewNote }>Create New Note</button>
                    </div>
                </div>
                <div className="ContentPanel__body">
                    <textarea
                        ref={ this.noteContentTextarea }
                        className="ContentPanel__textarea"
                        value={ this.state.newNote.body || '' }
                        placeholder="note body"
                        onChange={ this.updateNewNote }></textarea>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="ContentPanel">
                {
                    this.createNewNoteUI()
                }
            </div>
        );
    }
}

export default ContentPanel;