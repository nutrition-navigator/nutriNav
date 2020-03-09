import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodsToCompare: props.userCompared,
		}
		console.log('compare array:', this.state.foodsToCompare);
	};


	render() {
		return (
			<div className="comparisonPage">
				<Nav />
				<h1>Compare Items</h1>
				<div className="comparisonContainer">
					{this.state.foodsToCompare.map(food => {
						return (
							<ComparisonCard
								key={food.key}
								food={food}
								removeItem={this.props.removeItem(this.props.key, 'compares')}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Compare;
