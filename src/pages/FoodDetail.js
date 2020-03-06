import React, { Component, Fragment } from "react";
import Nav from "../components/Nav";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      nutrientValues: [],
      props: {
        type: "brand",
        nutrients: [
          { name: "Vitamin A", id: 318, unit: "IU" },
          { name: "Vitamin D", id: 324, unit: "IU" },
          { name: "Vitamin B-6", id: 415, unit: "mg" },
          { name: "Vitamin C", id: 401, unit: "mg" },
          { name: "Vitamin E", id: 323, unit: "mg" },
          { name: "Magnesium", id: 304, unit: "mg" },
          { name: "Zinc", id: 309, unit: "mg" },
					{ name: "Iron", id: 303, unit: "mg" },
					{ name: "Fiber", id: 303, unit: "g" }
        ],
        match: { params: { id: "54836a2305e256f87e091b04" } }
      }
    };
	}
	
	// 54836a2305e256f87e091b04


  componentDidMount() {
		this.props
      .getDetails(this.state.props.match.params.id, this.state.props.type)
      .then(response => {
				let values = [];
        const food = response.data.foods[0];
        this.setState(
          {
            food
          },
          () => {
						console.log('FOOD', this.state.food);
						console.log('FOOD FULL NUTRIENTS', this.state.food.full_nutrients);
          }
        );
        values = this.state.props.nutrients.map(nutrient => {
					console.log('NUTRIENT ID', nutrient.id);
					const value = this.props.getValue(nutrient.id, food.full_nutrients);
					console.log('RETURNING VALUE', value);
          return {
            name: nutrient.name,
            id: nutrient.id,
            value: value
          };
        });
				console.log('VALUES ARRAY', values);
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
