import React, { Component, Fragment } from "react";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      foodNutrients: []
    };
  }

  // 54836a2305e256f87e091b04

  componentDidMount() {
    this.props
      .getDetails(this.props.id, this.props.type)
      .then(response => {
        const food = response.data.foods[0];

        const values = this.props.nutrients.map(nutrient => {
          const value = this.props.getValue(nutrient.id, food.full_nutrients);
          return {
            name: nutrient.name,
            id: nutrient.id,
            value: value,
            unit: nutrient.unit
          };
        });
        this.setState(
          {
            foodNutrients: values
          },
          () => {
            console.log(this.state.foodNutrients);
          }
        );

        this.setState(
          {
            food: {
              name: food.food_name,
              brand: food.brand_name,
              url: food.photo.highres,
              isRaw: food.metadata.is_raw_food,
              serving: food.serving_qty,
              servingUnit: food.serving_unit,
              servingWeight: food.serving_weight_grams,
              calories: food.nf_calories,
              carbs: food.nf_total_carbohydrate,
              sodium: food.nf_sodium,
              sugar: food.nf_sugars,
              fat: food.nf_total_fat,
              saturatedFat: food.nf_saturated_fat
            }
          },
          () => {
            console.log(this.state.food);
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
        <h1> Food Details </h1>
        <h2> Food Name: {this.state.food.name}</h2>
        <ul>
          {this.state.foodNutrients.map(nutrient => {
            return (
              <li key={nutrient.id}>
                {nutrient.name} - {nutrient.value} {nutrient.unit}
              </li>
            );
          })}
        </ul>
        <button>Add To Favorites</button>
        <button>Add To Compare</button>
      </Fragment>
    );
  }
}

export default FoodDetail;
