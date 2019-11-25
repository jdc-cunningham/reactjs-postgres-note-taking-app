import React, { Component } from 'react';
import './ContentPanel.scss';
import axios from 'axios';

class ContentPanel extends Component {
    state = {
        newNote: {
            name: "",
            body: "",
            collapsed: true
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
    viewNoteNameInput = React.createRef();
    viewNoteContentTextarea = React.createRef();

    updateNewNote = this.updateNewNote.bind(this);
    updateActiveNote = this.updateActiveNote.bind(this);
    getNoteById = this.getNoteById.bind(this);
    updateNote = this.updateNote.bind(this);
    clearNewNoteFields = this.clearNewNoteFields.bind(this);
    createNewNote = this.createNewNote.bind(this);
    createViewNoteUI = this.createViewNoteUI.bind(this);

    updateNewNote() {
        const newNoteName = this.noteNameInput.current.value;
        const newNoteBody = this.noteContentTextarea.current.value;
        this.setState({
            newNote: {
                name: newNoteName,
                body: newNoteBody,
                collapsed: false
            }
        });
    }

    updateActiveNote() {
        const newNoteName = this.viewNoteNameInput.current.value;
        const newNoteBody = this.viewNoteContentTextarea.current.value;
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
        const activeNoteName = this.viewNoteNameInput.current.value;
        const activeNoteContent = this.viewNoteContentTextarea.current.value;
        const data = {
            noteId: this.state.activeNoteId,
            noteName: activeNoteName,
            noteContent: activeNoteContent
        };

        axios.post(this.apiBasePath + '/update-note/', data)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    alert('note updated');
                    const modState = this.state;
                    this.state.activeNote.saveBtnDisabled = true;
                    this.setState({
                        modState
                    });
                }
            })
            .catch((error) => {
                return false;
            });
    }

    clearNewNoteFields() {
        this.setState({
            newNote: {
                name: "",
                body: "",
                collapsed: false
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
                            placeholder="note name"
                            onChange={ this.updateNewNote } />
                        <button type="button" onClick={ this.createNewNote }>Create New Note</button>
                    </div>
                </div>
                <div className="ContentPanel__body">
                    <textarea
                        ref={ this.noteContentTextarea }
                        className={"ContentPanel__textarea" + (this.state.newNote.collapsed ? " collapsed" : "")}
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
                                ref={ this.viewNoteNameInput }
                                className="ContentPanel__top-bar-title-text"
                                value={ activeNote.name || '' }
                                placeholder="note name"
                                onChange={ this.updateActiveNote } />
                            <button
                                type="button"
                                disabled={ this.state.activeNote.saveBtnDisabled }
                                onClick={ this.updateNote }>Save Note Changes</button>
                        </div>
                    </div>
                    <div className="ContentPanel__body">
                        <textarea
                            ref={ this.viewNoteContentTextarea }
                            className="ContentPanel__textarea"
                            value={ activeNote.body || '' }
                            placeholder="note body"
                            onChange={ this.updateActiveNote }></textarea>
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
        console.log('render');
        console.log(this.noteNameInput);
        const activeNoteId = this.props.activeNoteId;
        const newNoteUI = this.createNewNoteUI();
        const loadNoteUI = this.state.activeNoteId !== activeNoteId ?
            this.getNoteById(activeNoteId) : this.createViewNoteUI();

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