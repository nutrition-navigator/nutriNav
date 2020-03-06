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
				<div className="wrapper">
					{this.props.foodItems.map((foodItem, index) => (
						<FoodCard key={index} foodItem={foodItem}/>
					))}
				</div>
			</div>
		);
	}
}

export default FoodResults;
