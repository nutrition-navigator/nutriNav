import React, { Component } from "react";
import FavouriteCard from "./FavouriteCard";

class FavouriteResults extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="foodContainer">
        {this.props.foodItems.map((foodItem, index) => (
          <FavouriteCard removeItem={this.props.removeItem} key={index} foodItem={foodItem} />
        ))}
      </div>
    );
  }
}

export default FavouriteResults;
