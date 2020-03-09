import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodsToCompare: this.props.userCompared,
		}
	};

	// componentDidMount() {
	// 	console.log('compare array:', this.state.foodsToCompare);
	// }
	

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
								id={food.key}
								food={food}
								removeItem={this.props.removeItem}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Compare;
