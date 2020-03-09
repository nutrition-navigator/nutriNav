import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	foodsToCompare: props.userCompared,
		// }
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
					{this.props.userCompared.map(food => {
						return (
							<ComparisonCard
								key={food.key}
								food={food}
								removeItem={this.props.removeItem()}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Compare;
