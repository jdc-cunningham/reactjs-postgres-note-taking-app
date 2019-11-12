import React, { Component } from 'react';
import './SidePanel.scss';
import axios from 'axios';

class SidePanel extends Component {
    searchNotes = this.searchNotes.bind(this);
    inputSearch = React.createRef();

    searchNotes(searchEntry) {
        
    }

    render() {
        return (
            <div className="SidePanel">
                <input type="text" placeholder="search" ref={ this.inputSearch } onKeyUp={ this.searchNotes } />
            </div>
        );
    }
}

export default SidePanel;