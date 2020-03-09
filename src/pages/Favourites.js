import React, { Component } from 'react';
import Nav from '../components/Nav';
import FavouriteResults from "../components/FavouriteResults";

class Favourites extends Component {
	render() {
		return (
      <div className="favourites">
        <Nav />
        <div className="pageContainer">
          <div className="wrapper">
            <h1 className="pageTitle">Saved Items</h1>
            <FavouriteResults foodItems={this.props.savedFoods} removeItem={this.props.removeItem} />
          </div>
        </div>
      </div>
    );
	}
}

export default Favourites;
