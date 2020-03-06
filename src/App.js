import React, { Component } from 'react';
import Home from './pages/Home';
import './App.css';
import TestApp from './components/TestApp';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>WOHOO</h1>
					<Home />
					<TestApp />
				</header>
			</div>
		);
	}
}

export default App;
