import React, { Component } from 'react';
import './ContentPanel.scss';
import axios from 'axios';
import { resolve } from 'dns';

class ContentPanel extends Component {
    state = {
        newNote: {
            name: "",
            body: ""
        },
        activeNote: {
            name: "",
            body: "",
            saveBtnDisabled: true
        },
        activeNoteLoaded: false
        // activeNoteId: this.props.activeNoteId // anti-pattern, not working
    }

    apiBasePath = 'http://localhost:5001/api';
    noteNameInput = React.createRef();
    noteContentTextarea = React.createRef();
    updateNewNote = this.updateNewNote.bind(this);
    createNewNote = this.createNewNote.bind(this);
    updateNote = this.updateNote.bind(this);
    getNoteById = this.getNoteById.bind(this);
    createViewNoteUI = this.createViewNoteUI.bind(this);

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

    updateActiveNote() {
        const newNoteName = this.noteNameInput.current.value;
        const newNoteBody = this.noteContentTextarea.current.value;
        this.setState({
            activeNote: {
                name: newNoteName,
                body: newNoteBody
            }
        });
    }

    // componentDidUpdate() {
    //     console.log('yes');
    // }

    // componentDidMount() {
    //     console.log('mount');
    // }

    getNoteById(noteId) {
        const data = {
            noteId: noteId
        };

        axios.post(this.apiBasePath + '/get-note/', data)
            .then((response) => {
                console.log(response);
                if (response.status === 200 && response.data) {
                    // return this.createViewNoteUI(response.data);
                    const curState = this.state;
                    // curState.activeNote = {
                    //     name: response.data.name,
                    //     body: response.data.content
                    // };
                    // curState.activeNoteLoaded = true;
                    // this.setState(curState);
                    // console.log('set state');
                }
            })
            .catch((error) => {
                return false;
            });
    }

    updateNote() {

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

    createViewNoteUI() {
        const activeNote = this.state.activeNote;
        return (
            <div className="ContentPanel__interface-group">
                <h2>Loaded Note</h2>
                <div className="ContentPanel__top-bar">
                    <div className="ContentPanel__top-bar-display">
                        <input
                            type="text"
                            ref={ this.noteNameInput }
                            className="ContentPanel__top-bar-title-text"
                            value={ activeNote.name || '' }
                            placeholder="note name"
                            onChange={ this.updateActiveNote } />
                        <button type="button" disabled={ this.state.activeNote.saveBtnDisabled } onClick={ this.updateNote }>Save Note Changes</button>
                    </div>
                </div>
                <div className="ContentPanel__body">
                    <textarea
                        ref={ this.noteContentTextarea }
                        className="ContentPanel__textarea"
                        value={ activeNote.content || '' }
                        placeholder="note body"
                        onChange={ this.updateNewNote }></textarea>
                </div>
            </div>
        );
        // if (activeNoteId) {
        //     const noteData = this.getNoteById(activeNoteId);
        //     if (noteData) {
                
        //     } else {
        //         return "Failed to get note content"
        //     }
        // } else {
        //     return "Load a note by searching on the sidepanel"
        // }
    }

    render() {
        const activeNoteId = this.props.activeNoteId;
        console.log(activeNoteId);
        console.log(this.state);

        return (
            <div className="ContentPanel">
                {
                    // this.createNewNoteUI()
                    !this.activeNoteLoaded ? this.getNoteById(activeNoteId) : this.createViewNoteUI()
                }
            </div>
        );
    }
}

export default ContentPanel;