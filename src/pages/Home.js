import React, { Component } from 'react';
import Nav from '../components/Nav';
import TestApp from '../components/TestApp';

import FoodResults from '../components/FoodResults';

class Home extends Component {
	render() {
		return (
      <div className="home">
        <Nav resetFilter={this.props.resetFilter} />
        <div className="pageContainer">
          <div className="wrapper">
            <div className="searchBar">
              <div className="input">
                <input
                  type="search"
                  name="search"
                  id="search"
                  onChange={this.props.userSearch}
                  placeholder="What food are you looking for?"
                />
              </div>

              <div className="toggleBtns">
                <button
                  className={
                    this.props.type === "common"
                      ? "toggle toggleCommon toggleActive"
                      : "toggle toggleCommon"
                  }
                  id="common"
                  onClick={this.props.foodTypeButtonClick}
                >
                  Common
                </button>
                <button
                  className={
                    this.props.type === "branded"
                      ? "toggle toggleBranded toggleActive"
                      : "toggle toggleBranded"
                  }
                  id="branded"
                  onClick={this.props.foodTypeButtonClick}
                >
                  Branded
                </button>
              </div>
            </div>

            <FoodResults foodItems={this.props.foodItems} />
          </div>
        </div>
      </div>
    );
	}
}

export default Home;
