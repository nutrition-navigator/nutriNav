import React, { Component } from 'react';
import Nav from '../components/Nav';
import TestApp from '../components/TestApp';

import FoodResults from '../components/FoodResults';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			randomFoodItems: ['corn', 'cheese', 'spinach', 'sausage mcmuffin']
		};
	}

	render() {
		return (
			<div className="home-page">
				{/* Nav */}
				<Nav />

				{/* Search bar */}
				<input type="search" name="search" id="search" />
				<div className="toggle-switch">
					<input
						type="checkbox"
						className="toggle-switch-checkbox"
						name="toggleSwitch"
						id="toggleSwitch"
					/>

					<label className="toggle-switch-label" htmlFor="toggleSwitch">
						<span className="toggle-switch-inner" />
						<span className="toggle-switch-switch" />
					</label>
				</div>

				{/* Food Results */}

				<FoodResults foodItems={this.props.foodItems} type={this.props.type} />
			</div>
		);
	}
}

export default Home;
