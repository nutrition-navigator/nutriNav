import React, { Component } from "react";
import axios from "axios";

class TestApp extends Component {
  constructor() {
    super();
    this.state = {
      targetNutrients: [
        "Vitamin A",
        "Vitamin D",
        "Vitamin B-6",
        "Vitamin C",
        "Vitamin E",
        "Magnesium",
        "Zinc",
        "Iron",
        "Fiber"
      ],
      showIDs: false,
      nutrients: [], // [ {name: "Vitamin A", id: 21}, {...}]
      search: "pizza pops", // from input
      food: {},
      showValues: false,
      nutrientsValues: []
    };
  }

  getNutrients = () => {
    let nutrientsAPI = [];
    axios({
      url: "https://trackapi.nutritionix.com/v2/utils/nutrients",
      method: "GET",
      responseType: "json",
      headers: {
        "x-app-id": "f55663ad",
        "x-app-key": "8a4711b9498f267927ad120c76ab8808",
        "x-remote-user-id": "0"
      }
    }).then(response => {
      nutrientsAPI = response.data;
      const tempNutrients = this.state.targetNutrients.map(nutrientName => {
        return {
          name: nutrientName,
          id: this.getNutrientID(nutrientName, nutrientsAPI)
        };
      });
      this.setState({
        nutrients: tempNutrients
      });
    });
  };

  getNutrientID = (name, nutrientsAPI) => {
    const tempNutrient = nutrientsAPI.filter(nutrient => {
      return nutrient.usda_nutr_desc.includes(name);
    });
    return tempNutrient[0].attr_id;
  };


  getNutrientValue = (id, foodNutrients) => {
    const tempNutrient = foodNutrients.filter(nutrient => {
      return nutrient.attr_id === id;
    });
    return tempNutrient[0].value;
  }



  getNutrientsValues = () => {
    let values = [];
    axios({
      url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      method: "POST",
      headers: {
        "x-app-id": "f55663ad",
        "x-app-key": "8a4711b9498f267927ad120c76ab8808",
        "x-remote-user-id": "0",
        "content-type": "application/json"
      },
      data: {
        query: this.state.search,
      }
    })
      .then(response => {
        const food = response.data.foods[0];
        this.setState(
          {
            food
          },
          () => {
            // console.log(this.state.food);
          }
        );

        values = this.state.nutrients.map(nutrient => {
          return {
            name: nutrient.name,
            id: nutrient.id,
            value: this.getNutrientValue(nutrient.id, food.full_nutrients)
          };
        });
        this.setState({
          nutrientsValues: values,
        }, () => {
          this.setState({ showValues: !this.state.showValues });
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getNutrients();
  }

  render() {
    return (
      <div>
        <button
          id="ids"
          type="button"
          onClick={() => {
            this.setState({ showIDs: !this.state.showIDs });
          }}
        >
          {" "}
          Get Nutrients and their IDs
        </button>

        {this.state.showIDs ? (
          <ul>
            <h2> NUTRIENT NAMES AND IDS</h2>
            {this.state.nutrients.map(nutrient => (
              <li key={nutrient.id}>
                {" "}
                NAME: {nutrient.name} | ID: {nutrient.id}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <button id="values" type="button" onClick={this.getNutrientsValues}>
          {" "}
          Get Nutrients and Their Values
        </button>

        {this.state.showValues ? (
          <ul>
            <h2> NUTRIENT AND VALUES FOR "{this.state.search}" </h2>
            {this.state.nutrientsValues.map(nutrient => (
              <li key={nutrient.id}>
                {" "}
                NAME: {nutrient.name} |  ID: {nutrient.id} | VALUE: {" "}{nutrient.value}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TestApp;
