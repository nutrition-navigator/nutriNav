import React, { Component } from 'react';
import Nav from './Nav';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        < Nav />
        <h1>App is running</h1>
      </div>
    );
  }
}

export default App;
