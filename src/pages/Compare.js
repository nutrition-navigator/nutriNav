import React, { Component } from 'react';
import Nav from '../components/Nav';
import ComparisonCard from '../components/ComparisonCard';

class Compare extends Component {
	// componentDidMount() {
	// 	console.log('compare array:', this.state.foodsToCompare);
	// }

	render() {
		return (
      <div className="comparisonPage">
        <Nav resetFilter={this.props.resetFilter} />
        <h1 className="pageTitle">Compare Items</h1>
        <div className="wrapper">
          <div className="comparisonContainer">
            {this.props.userCompared.map(food => {
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
      </div>
    );
	}
}

export default Compare;
