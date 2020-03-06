import React, { Component } from 'react';
import FoodCard from './FoodCard';

class FoodContainer extends Component {
	state = {
		food: [],
		type: []
	};

	componentDidMount() {}

	render() {
		return (
			<div className="foodContainer">
				<div className="wrapper">
					<FoodCard />
					<button className="btn">Load More</button>
				</div>
			</div>
		);
	}
}

export default FoodContainer;
