import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestApp from './components/TestApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>WOHOO</h1>
        <TestApp />
       
      </header>
    </div>
  );
}

export default App;
