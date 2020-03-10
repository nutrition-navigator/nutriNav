import React, { Component } from 'react';
import FoodCard from './FoodCard';

class FoodResults extends Component {
	componentDidMount() {}

	render() {
		return (
			<div className="foodContainer">
				{this.props.foodItems.length===0 ? <p>Your search found nothing, please try something else.</p> :
					this.props.foodItems.map((foodItem, index) => (
						<FoodCard key={index} foodItem={foodItem} />
					))}
				
			</div>
		);
	}
}

export default FoodResults;
