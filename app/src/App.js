import React, { Component } from 'react';
import './css-reset.css';
import './App.css';
import SidePanel from './components/side-panel/SidePanel';
import ContentPanel from './components/content-panel/ContentPanel';

class App extends Component {
  state = {
    activeNoteId: null
  }

  updateActiveNoteId = this.updateActiveNoteId.bind(this);

  updateActiveNoteId(noteId) {
    this.setState({
      activeNoteId: noteId
    })
  }

  render() {
    return (
      <div className="App">
        <SidePanel updateActiveNoteId={ this.updateActiveNoteId } />
        <ContentPanel activeNoteId={ this.state.activeNoteId } />
      </div>
    );
  }
}

export default App;
