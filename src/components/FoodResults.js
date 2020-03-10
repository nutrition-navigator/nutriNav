import React, { Component } from 'react';
import FoodCard from './FoodCard';

class FoodResults extends Component {
	componentDidMount() {}

	render() {
		return (
			<div className="foodContainer">
				{this.props.foodItems.length === 0 ? (
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
