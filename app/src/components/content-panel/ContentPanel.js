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
        noteLoaded: false,
        activeNoteId: null
        // propNoteId: this.props.activeNoteId
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

    // shouldComponentUpdate() {
    //     console.log(this.state.activeNoteId);
    //     console.log(this.state.propNoteId);
    //     if (this.state.activeNoteId !== this.props.activeNoteId) {
    //         return true;
    //     }
    //     return false;
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
                    curState.activeNoteId = noteId;
                    curState.activeNote = {
                        name: response.data.name,
                        body: response.data.content,
                        saveBtnDisabled: true
                    };
                    curState.noteLoaded = true;
                    this.setState(curState);
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

        if (this.state.noteLoaded) {
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
                            value={ activeNote.body || '' }
                            placeholder="note body"
                            onChange={ this.updateNewNote }></textarea>
                    </div>
                </div>
            );
        } else {
            return "Search and click on a note from the side panel";
        }
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
        const newNoteUI = this.createNewNoteUI();
        const loadNoteUI = this.state.activeNoteId !== activeNoteId ? this.getNoteById(activeNoteId) : this.createViewNoteUI();

        return (
            <div className="ContentPanel">
                <>
                    {newNoteUI}
                    {loadNoteUI}
                </>
            </div>
        );
    }
}

export default ContentPanel;