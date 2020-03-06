import React, { Component } from 'react';

class foodCard extends Component {
	state = {};
	render() {
		return (
			<div className="foodCard">
				<img
					src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
					alt=""
				/>
				<div className="cardContent">
					<h2 className="cardTitle">Mixed Berry Melody</h2>
					<h3 className="cardSubtitle">
						Ut enim ad minim veniam, quis nostrud.
					</h3>
				</div>
			</div>
		);
	}
}

export default foodCard;
