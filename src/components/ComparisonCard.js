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
        <h4>Description</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos voluptas ipsum minima totam placeat quod reprehenderit, fugiat quaerat debitis, modi ipsam distinctio nesciunt odio fugit voluptatum laborum amet deserunt labore.</p>
        <h4>Nutritional Information </h4>
        <p>{this.state.food.nutrients}</p>
        <button onClick={this.handleClick}>REMOVE</button>
      </div>
    );
  }
}

export default ComparisonCard;