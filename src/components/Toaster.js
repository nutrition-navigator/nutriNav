import React, { Component } from 'react';

class Toaster extends Component {
	constructor() {
		super();
		this.state = {
			theme: {
				SUCCESS: 'success',
				'SAVE FAILED': 'failed'
			}
		};
	}

	render() {
		const theme = this.state.theme[this.props.overall];
		return (
			<div className="hello">
				<div className={'toaster ' + theme}>
					<h2>{this.props.overall}</h2>
					<p> {this.props.message}</p>
				</div>
			</div>
		);
	}
}
export default Toaster;
