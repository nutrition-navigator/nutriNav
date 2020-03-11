import React, { Component } from "react";
import Nav from "../components/Nav";
import FavouriteResults from "../components/FavouriteResults";

class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      term: ""
    };
  }

  grabValue = e => {
    console.log("something was typed", e.target.value);
  };

  render() {
    return (
      <div className="favourites">
        <Nav resetFilter={this.props.resetFilter}/>
        <div className="pageContainer">
          <div className="wrapper">
            <h1 className="pageTitle">Saved Items</h1>
            <div className="pageFilter">
              <label htmlFor="filter">Filter by Name: </label>
              <input
                type="text"
                id="filter"
                onKeyUp={(e) => {
                  this.props.updateFilterString(e.target.value);
                }}
              ></input>
            </div>
            <FavouriteResults
              foodItems={this.props.savedFoods}
              removeItem={this.props.removeItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Favourites;
