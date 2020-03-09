import React, { Component } from 'react';
import Nav from '../components/Nav';
import FoodResults from '../components/FoodResults';

class Favourites extends Component {
	render() {
		return (
			<div className="favourites">
				<Nav />
				<div className="pageContainer">
					<div className="wrapper">
						<h1 className="pageTitle">Saved Items</h1>
						<FoodResults foodItems={this.props.savedFoods} />
					</div>
				</div>
			</div>
		);
	}
}

export default Favourites;
