import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Favourites from './pages/Favourites';
import FoodDetail from './pages/FoodDetail';
import Compare from './pages/Compare';
import Home from './pages/Home';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			commonFood: [],
			brandedFood: [],
			fullNutrients: [],
			userFavourites: [],
			type: 'branded'
		};
	}

	componentDidMount() {
		this.randomSearch();
	}

	fetchFood = query => {
		axios({
			url: 'https://trackapi.nutritionix.com/v2/search/instant',
			method: 'get',
			headers: {
				'x-app-key': 'cdddd74c181520e189039715e81472db',
				'x-app-id': '88ae7cda'
			},
			params: {
				query
			}
		}).then(res => {
			this.setState({
				brandedFood: res.data.branded,
				commonFood: res.data.common,
				userFavourites: res.data.common
			});
		});
	};

	randomSearch = () => {
		const randomArray = ['corn', 'cheese', 'spinach', 'big mac'];
		const randomInteger = Math.floor(Math.random() * 4);
		this.fetchFood(randomArray[randomInteger]);
	};

	userSearch = e => {
		const query = e.target.value;
		this.fetchFood(query);
	};

	foodTypeButtonClick = e => {
		this.setState({
			type: e.target.id
		});
	};

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
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
									userSearch={this.userSearch}
									foodTypeButtonClick={this.foodTypeButtonClick}
								/>
							)}
						/>
						<Route
							path="/favourites"
							render={() => (
								<Favourites savedFoods={this.state.userFavourites} />
							)}
						/>
						<Route path="/compare" component={Compare} />
						<Route path="/food/:id" component={FoodDetail} />
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
