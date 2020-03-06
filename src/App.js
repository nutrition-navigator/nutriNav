import React, { Component } from 'react';
import Home from './Home';
import './App.css';
import TestApp from './components/TestApp';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>WOHOO</h1>
				<Home />
				<TestApp />
			</header>
		</div>
	);
}

export default App;
