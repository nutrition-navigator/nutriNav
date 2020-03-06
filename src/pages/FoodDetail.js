import React, { Component, Fragment } from "react";
import Nav from "../components/Nav";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      nutrientValues: [],
    };
	}
	
	// 54836a2305e256f87e091b04


  componentDidMount() {
		this.props
      .getDetails(this.props.id, this.props.foodType)
      .then(response => {
        let values = [];
        const food = response.data.foods[0];
        this.setState(
          {
            food
          },
          () => {
            console.log("FOOD", this.state.food);
            console.log("FOOD FULL NUTRIENTS", this.state.food.full_nutrients);
          }
        );
        values = this.props.nutrients.map(nutrient => {
          console.log("NUTRIENT ID", nutrient.id);
          const value = this.props.getValue(nutrient.id, food.full_nutrients);
          console.log("RETURNING VALUE", value);
          return {
            name: nutrient.name,
            id: nutrient.id,
            value: value
          };
        });
        console.log("VALUES ARRAY", values);
        this.setState(
          {
            nutrientValues: values
          },
          () => {
            console.log("STATE VALUES ARRAY", this.state.nutrientValues);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });

  }

  render() {
		return (
      <Fragment>
        <Nav />
				<h1> Food Details </h1>
				<button>Add To Favorites</button>
      </Fragment>
    );
		
  }
}

export default FoodDetail;
