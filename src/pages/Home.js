import React, { Component } from 'react';
import Nav from '../components/Nav';

class Home extends Component {
	render() {
		return (
			<div className="home-page">
				<Nav />
				<input type="search" name="search" id="search" />
				<div className="toggle-switch">
					<input
						type="checkbox"
						className="toggle-switch-checkbox"
						name="toggleSwitch"
						id="toggleSwitch"
					/>
					<label className="toggle-switch-label" htmlFor="toggleSwitch">
						<span className="toggle-switch-inner" />
						<span className="toggle-switch-switch" />
					</label>
				</div>

			</div>
		)
	}
}

export default Home;
