import React, { Component } from 'react';
import './ContentPanel.scss';
import axios from 'axios';

class ContentPanel extends Component {
    state = {
        uiMode: "display",
        activeNote: {
            name: "",
            content: ""
        }
    }

    apiBasePath = 'http://localhost:5001/api';
    noteNameInput = React.createRef();
    noteContentTextarea = React.createRef();
    getTopBarUI = this.getTopBarUI.bind(this);
    getTextAreaUI = this.getTextareaUI.bind(this);

    getUserData () {
        return false;

        // return {
        //     id: 1,
        //     name: "test",
        //     content: "test content"
        // };
    }

    saveNote () {
        const noteData = {
            name: this.noteNameInput.current.value,
            content: this.noteContentTextarea.current.value
        };

        if (!noteData.name || !noteData.content) {
            alert('Please make sure both name and content are not empty');
        } else {
            const data = {};
            data.noteName = noteData.name;
            data.noteContent = noteData.content;

            axios.post(this.apiBasePath + '/save-note/', data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    getTopBarUI (noteNameInputRef) {
        let topBarUI;

        switch (this.state.uiMode) {
                case "new":
                    topBarUI = <div className="ContentPanel__top-bar-display">
                        <input ref={ noteNameInputRef } className="ContentPanel__top-bar-title-text" />
                        <button type="button" onClick={ this.saveNote }>Create Note</button>
                    </div>
                case "edit":
                    topBarUI = <div className="ContentPanel__top-bar-modify">
                        <input ref={ noteNameInputRef } type="text" placeholder="note name" />
                        <button type="button" onClick={ this.saveNote }>Save Changes</button>
                    </div>;
                case "delete":
                    topBarUI = <div className="ContentPanel__top-bar-modify">
                        <input ref={ noteNameInputRef } type="text" placeholder="note name" />
                        <button type="button" onClick={ this.deleteNote }>Delete Note</button>
                    </div>;
                default:
                    topBarUI = <div className="ContentPanel__top-bar-text">
                        <div className="ContentPanel__top-bar-display">{ this.state.activeNote.name }</div>
                        <button type="button" onClick={ this.deleteNote }>New Note</button>
                    </div>;
        }

        return topBarUI;
    }

    getTextareaUI (noteContentTextareaRef) {
        let textareaUI;

        switch (this.state.uiMode) {
            case "new":
                textareaUI = <textarea ref={ noteContentTextareaRef } className="ContentPanel__textarea" value={ this.state.activeNote.content } onChange={ this.saveNote }></textarea>;
            default:
                textareaUI = <textarea ref={ noteContentTextareaRef } placeholder="write note" className="ContentPanel__textarea-modify" onChange={ this.saveNote }></textarea>;
        }

        return textareaUI;
    }

    render () {
        return (
            <div className="ContentPanel">
                <div className="ContentPanel__top-bar">
                    { this.getTopBarUI(this.noteNameInput) }
                </div>
                <div className="ContentPanel__body">
                    { this.getTextareaUI(this.noteContentTextarea) }
                </div>
            </div>
        );
    }
}

export default ContentPanel;