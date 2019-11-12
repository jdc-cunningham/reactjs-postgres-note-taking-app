import React from 'react';
import './css-reset.css';
import './App.css';
import SidePanel from './components/side-panel/SidePanel';
import ContentPanel from './components/content-panel/ContentPanel';

function App() {
  return (
    <div className="App">
      <SidePanel />
      <ContentPanel />
    </div>
  );
}

export default App;
