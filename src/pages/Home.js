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
				<Nav />

				<div className="pageContainer">
					<div className="wrapper">
						<div className="searchBar">
							<div className="input">
								<input
									type="search"
									name="search"
									id="search"
									onChange={this.props.userSearch}
								/>
							</div>

							<div className="toggleBtns">
								<button className="btn">Common</button>
								<button className="btn">Branded</button>
							</div>
						</div>

						<FoodResults
							foodItems={this.props.foodItems}
							type={this.props.type}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
