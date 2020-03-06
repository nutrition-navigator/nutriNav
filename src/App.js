import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favourites from './pages/Favourites';
import FoodDetail from './pages/FoodDetail';
import Compare from './pages/Compare';
import Home from './pages/Home';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			commonFood: [
				{
					tag_name: '',
					food_name: '',
					photo: {
						thumb: ''
					},
					serving_qty: ''
				}
			],
			brandedFood: [
				{
					tag_name: '',
					food_name: '',
					nix_item_id: '',
					brand_name: '',
					photo: {
						thumb: ''
					},
					serving_qty: ''
				}
			],
			fullNutrients: [],
			userFavourites: [],
			type: 'branded'
		};
	}

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<h1>WOHOO</h1>
						<Route
							path="/"
							exact
							render={() => (
								<Home
									foodItems={
										this.state.type === 'branded'
											? this.state.brandedFood
											: this.state.commonFood
									}
								/>
							)}
						/>
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
