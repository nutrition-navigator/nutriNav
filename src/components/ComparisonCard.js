import React, { Component } from 'react';


class ComparisonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compared: this.props.food
    }
  }


  render() {
    return (
      <div className="comparisonCard">
        <img src={this.state.compared.imgURL} alt={this.state.compared.name} />
        <h3>{this.state.compared.name}</h3>
        <h4>Ingredients</h4>
        <p>{this.state.compared.nutrients}</p>
        <button>REMOVE</button>
      </div>
    );
  }
}

export default ComparisonCard;