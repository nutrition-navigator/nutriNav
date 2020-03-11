import React, { Component } from 'react';
import FoodCard from './FoodCard';

class FoodResults extends Component {

	// Checking if the user has typed anything before giving the error message that their search returned anything. This prevents error message on page load
	checkTyped = () => {
		if (this.props.hasUserTyped === false && this.props.foodItems.length === 0) {
			return false
		} else if (this.props.hasUserTyped === true && this.props.foodItems.length === 0 ) {
			return true
		} else {
			return false
		}
	}

	render() {
		return (
			<div className="foodContainer">
				{this.checkTyped()  ? (
					<div className="noResults">
						<img src="https://i.imgur.com/S81lkaK.png" alt="" />
						<p>
							Sorry! We didn't find anything. Please try another search term.
						</p>
					</div>
				) : (
					this.props.foodItems.map((foodItem, index) => (
						<FoodCard key={index} foodItem={foodItem} />
					))
				)}
			</div>
		);
	}
}

export default FoodResults;
