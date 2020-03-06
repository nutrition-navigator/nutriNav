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
      nutrients: [], // [ {name: "Vitamin A", id: 21}, {...}]
      search: "cheese", // from input
      food: {}
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

  render() {
    return (
      <div>
        <button type="button" onClick={this.getNutrients}>
          {" "}
          Get Nutrients and their IDs
        </button>

        {this.state.nutrients.length > 0 ? (
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

        <button type="button" onClick={this.getNutrients}>
          {" "}
          Get Nutrients and Their Values 
        </button>

        {this.state.nutrients.length > 0 ? (
          <ul>
            <h2> NUTRIENT AND VALUES FOR {this.state.search}</h2>
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
      </div>
    );
  }
}
export default TestApp;
