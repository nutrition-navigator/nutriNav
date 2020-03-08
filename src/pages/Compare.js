import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	constructor() {
		super();
		this.state = {
			// this is random data, will be replaced by array in App.js
			compared: [
				{
					key: 'fbKey1',
					name: 'cheese',
					imgURL: 'https://d2xdmhkmkbyw75.cloudfront.net/1034_thumb.jpg',
					nutrients: [],
				},
				{
					key: 'fbKey2',
					name: 'skinless chicken breast',
					imgURL: 'https://d2xdmhkmkbyw75.cloudfront.net/7820_thumb.jpg',
					nutrients: [],
				},
				{
					key: 'fbKey3',
					name: 'burger',
					imgURL: 'https://d2xdmhkmkbyw75.cloudfront.net/608_thumb.jpg',
					nutrients: [],
				}
			]
		}
	}

	render() {
		return (
			<div className="comparisonPage">
				<Nav />
				<h1>Compare Items</h1>
				<div className="comparisonContainer">
					{this.state.compared.map((food) => {
						return(
							<ComparisonCard key={food.key} food={food} />
						)
					})}
				</div>
			</div>
		);
	}
}

export default Compare;
