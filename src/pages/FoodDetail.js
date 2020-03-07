import React, { Component } from "react";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
			foodNutrients: [],
			isReady: false,
    };
  }

  componentDidMount() {
		this.props
		   // calls the a function from props that makes an axios call based on the passed id and type
      .getDetails(this.props.id, this.props.type)
      .then(response => {
        
				const food = this.props.completeFoodNutrients(response.data.foods[0]);
				// this map completes the information for all the nutrients for this food, including the amount of it and the unit of measurement
        const completeNutrients = this.props.nutrients.map(nutrient => {
					// calls a function from props that maps this nutrient to its value using another axios calls
					const value = this.props.getValue(nutrient.id, food.full_nutrients);
					// returns the completed nutrient profile as an object to exist in the completedNutrients array
          return {
            name: nutrient.name,
            id: nutrient.id,
            value: Math.round(value),
            unit: nutrient.unit
          };
				});
				// saves this food's completed nutrients to state
        this.setState({
          foodNutrients: completeNutrients
				});
				// creates a food object and saves it to state
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
              // other non-critical nutrients mentioned in the Client Brief
              others: {
                Calories: { value: Math.round(food.nf_calories), unit: "kcal" },
                Carbs: {
                  value: Math.round(food.nf_total_carbohydrate),
                  unit: "g"
                },
                Sodium: { value: Math.round(food.nf_sodium), unit: "mg" },
                Sugar: { value: Math.round(food.nf_sugars), unit: "g" },
                Fat: { value: Math.round(food.nf_total_fat), unit: "g" },
                "Saturated Fat": {
                  value: Math.round(food.nf_saturated_fat),
                  unit: "g"
                },
                Fiber: {
                  value: Math.round(
                    // uses the fiber from the main nutrients
                    this.state.foodNutrients.filter(n => n.name === "Fiber")[0]
                      .value
                  ),
                  unit: "g"
                }
              }
            }
					},					
          () => {
            // removes fiber from the main nutrients
            this.setState(
              {
                foodNutrients: this.state.foodNutrients.slice(
                  0,
                  this.state.foodNutrients.length - 1
                )
              },
              () => {this.setState({isready: true})}
            );
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const otherNutrients = [];
    for (let key in this.state.food.others) {
      otherNutrients.push({
        name: key,
        value: this.state.food.others[key].value,
        unit: this.state.food.others[key].unit
      });
    }
    return (
      <div className="detail">
				{this.state.isReady
					?	<img src={this.state.food.url} alt={this.food.name}></img>
					: ""
				}
        <h1> {this.state.food.name}</h1>
        <h2>Main Nutrients</h2>
        <ul>
          {this.state.foodNutrients.map(nutrient => {
            return (
              <li key={nutrient.id}>
                {nutrient.name}: {nutrient.value} {nutrient.unit}
              </li>
            );
          })}
        </ul>
        <h2>Secondary Nutrients</h2>
        <ul>
          {otherNutrients.map(other => {
            return (
              <li key={other.name}>
                {other.name}: {other.value} {other.unit}
              </li>
            );
          })}
        </ul>
        <button>Add To Favorites</button>
        <button>Add To Compare</button>
      </div>
    );
  }
}
export default FoodDetail;
