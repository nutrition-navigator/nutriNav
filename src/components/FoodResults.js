import React, { Component } from 'react';
import FoodCard from './FoodCard';

class FoodResults extends Component {
	state = {
		food: [],
		type: []
	};

	componentDidMount() {}

	render() {
		return (
			<div className="foodContainer">
				{this.props.foodItems.map((foodItem, index) => (
					<FoodCard key={index} foodItem={foodItem} />
				))}
			</div>
		);
	}
}

export default FoodResults;
