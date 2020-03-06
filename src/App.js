import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favourites from './pages/Favourites';
import FoodDetail from './pages/FoodDetail';
import Compare from './pages/Compare';
import Home from './pages/Home';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
      commonFood: [
        {
          tag_name: "chicken",
          food_name: "chicken",
          photo: {
            thumb: "https://d2xdmhkmkbyw75.cloudfront.net/9_thumb.jpg"
          },
          serving_qty: "3"
        },
        {
          tag_name: "chicken",
          food_name: "chicken",
          photo: {
            thumb: "https://d2xdmhkmkbyw75.cloudfront.net/9_thumb.jpg"
          },
          serving_qty: "3"
        },
        {
          tag_name: "chicken",
          food_name: "chicken",
          photo: {
            thumb: "https://d2xdmhkmkbyw75.cloudfront.net/9_thumb.jpg"
          },
          serving_qty: "3"
        }
      ],
      brandedFood: [
        {
          food_name: "Chunk Light Tuna in Water",
          nix_item_id: "51db37b6176fe9790a898901",
          brand_name: "Chicken Of The Sea",
          photo: {
            thumb: "https://d1r9wva3zcpswd.cloudfront.net/5cc40421892ab9da1dbd647a.jpeg"
          },
          serving_qty: "0.25"
        },
        {
          food_name: "Chunk Light Tuna in Water",
          nix_item_id: "51db37b6176fe9790a898901",
          brand_name: "Chicken Of The Sea",
          photo: {
            thumb: "https://d1r9wva3zcpswd.cloudfront.net/5cc40421892ab9da1dbd647a.jpeg"
          },
          serving_qty: "0.25"
        },
        {
          food_name: "Chunk Light Tuna in Water",
          nix_item_id: "51db37b6176fe9790a898901",
          brand_name: "Chicken Of The Sea",
          photo: {
            thumb: "https://d1r9wva3zcpswd.cloudfront.net/5cc40421892ab9da1dbd647a.jpeg"
          },
          serving_qty: "0.25"
        }
      ],
      fullNutrients: [],
      userFavourites: [],
      type: "branded"
    };
	}

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<h1>WOHOO</h1>
						<Route
							path="/"
							exact
							render={() => (
								<Home
									foodItems={
										this.state.type === 'branded'
											? this.state.brandedFood
											: this.state.commonFood
                  }
								/>
							)}
						/>
						<Route path="/favourites" component={Favourites} />
						<Route path="/compare" component={Compare} />
						<Route path="/food/:id" component={FoodDetail} />
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
