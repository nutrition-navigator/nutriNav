import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Favourites from './pages/Favourites';
import FoodDetail from './pages/FoodDetail';
import Compare from './pages/Compare';
import Home from './pages/Home';
import './App.css';


class App extends Component {
	render() {
		return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route path="/" exact component={Home} />
            <Route path="/favourites" component={Favourites} />
            <Route path="/compare" component={Compare} />
            <Route path="/food/:id" component={FoodDetail} />
          </header>
        </div>
      </Router>
    );
	}
}

export default App;
