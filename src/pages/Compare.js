import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	constructor() {
		super();
		this.state = {
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

// I am going to get an array:
// compare: {
// 	{
// 		name: 'cheese',
// 		type: 'common',
// 	}
// }
// if type is common, run one API call
// else run other API call
//
// pass the nutrient details from compared array to ComparisonCard.js 


	render() {
		return (
			<div>
				<Nav />
				<h1>Compare Items</h1>
				{this.state.compared.map((food) => {
					console.log(food);
					return(
						<ComparisonCard key={food.key} food={food} />
					)
				})}
			</div>
		);
	}
}

export default Compare;
