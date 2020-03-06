import React, { Component, Fragment } from "react";
import Nav from "../components/Nav";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      nutrientValues: [],
      props: {
        match: { params: { id: "burger" } }
      }
    };
	}
	
	// 54836a2305e256f87e091b04


  componentDidMount() {
		this.props
      .getDetails(this.state.props.match.params.id, this.props.type)
      .then(response => {
				let values = [];
        const food = response.data.foods[0];
        this.setState(
          {
            food
          },
          () => {
						// console.log('FOOD', this.state.food);
						// console.log('FOOD FULL NUTRIENTS', this.state.food.full_nutrients);
          }
        );
        values = this.props.nutrients.map(nutrient => {
					const value = this.props.getValue(nutrient.id, food.full_nutrients);
          return {
            name: nutrient.name,
            id: nutrient.id,
						value: value,
						unit: nutrient.unit,
          };
        });
        this.setState(
          {
            nutrientValues: values
          },
          () => {
            console.log('STATE VALUES ARRAY', this.state.nutrientValues);
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
