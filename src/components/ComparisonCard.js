import React, { Component } from 'react';

class ComparisonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      food: props.food,
    }
  }
    handleClick = () => {
      this.setState({
        remove: true,
      })
  }

  render() {
    return (
      <div className="comparisonCard">
        <div className="imageContainer">
          <img src={this.state.food.imgURL} alt={this.state.food.name} />
        </div>
        <h3>{this.state.food.name}</h3>
        <h4>Ingredients</h4>
        <p>{this.state.food.nutrients}</p>
        <button onClick={this.handleClick}>REMOVE</button>
      </div>
    );
  }
}

export default ComparisonCard;