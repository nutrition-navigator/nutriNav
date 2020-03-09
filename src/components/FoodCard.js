import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FoodCard extends Component {
	render() {
		const id = this.props.foodItem.nix_item_id
			? this.props.foodItem.nix_item_id
			: this.props.foodItem.food_name;
		return (
			<Link to={`/food/${id}`}>
				<div className="foodCard">
					<div className="cardImage">
						<img
							src={this.props.foodItem.photo.thumb}
							alt={this.props.foodItem.food_name}
						/>
					</div>

					<div className="cardContent">
						<h2 className="cardTitle">
							{this.props.foodItem.nix_item_id
								? this.props.foodItem.brand_name
								: this.props.foodItem.food_name}
						</h2>
						{this.props.foodItem.nix_item_id ? (
							<h3 className="cardSubtitle">{this.props.foodItem.food_name}</h3>
						) : null}
					</div>
				</div>
			</Link>
		);
	}
}

export default FoodCard;
