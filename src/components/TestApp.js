import React, { Component } from "react";
import axios from "axios";
import FoodDetail from "../pages/FoodDetail";

class TestApp extends Component {
  constructor() {
    super();
    this.state = {
      targetNutrients: [
        { name: "Vitamin A", unit: "IU" },
        { name: "Vitamin D", unit: "IU" },
        { name: "Vitamin B-6", unit: "mg" },
        { name: "Vitamin C", unit: "mg" },
        { name: "Vitamin E", unit: "mg" },
        { name: "Magnesium", unit: "mg" },
        { name: "Zinc", unit: "mg" },
        { name: "Iron", unit: "mg" },
        { name: "Fiber", unit: "g" }
      ],
      type: "common",
      id: "burger",
      nutrientsValues: [],
      nutrients: [],
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
        "x-app-key": "588db5b40c0c827f5af2785681421696",
        "x-remote-user-id": "0"
      }
    }).then(response => {
      nutrientsAPI = response.data;
      const tempNutrients = this.state.targetNutrients.map(nutrient => {
        return {
          name: nutrient.name,
          id: this.getNutrientID(nutrient.name, nutrientsAPI),
          unit: nutrient.unit
        };
      });
      this.setState(
        {
          nutrients: tempNutrients
        },
        () => {
          // console.log(this.state.nutrients);
        }
      );
    });
  };

  getNutrientID = (name, nutrientsAPI) => {
    const tempNutrient = nutrientsAPI.filter(nutrient => {
      return nutrient.usda_nutr_desc.includes(name);
    });
    return tempNutrient[0].attr_id;
  };

  getValue = (id, foodNutrients) => {
    const tempNutrient = foodNutrients.filter(nutrient => {
      return nutrient.attr_id === id;
    });
    return tempNutrient.length > 0 ? tempNutrient[0].value : 0;
  };

  getDetails = (id, type) => {
    const urlEndpoint = type === "common" ? "natural/nutrients" : "search/item";
    const method = type === "common" ? "POST" : "GET";
    const params = type === "common" ? {} : { nix_item_id: id };
    const data = type === "common" ? { query: id } : {};
    return axios({
      url: `https://trackapi.nutritionix.com/v2/${urlEndpoint}`,
      method: method,
      headers: {
        "x-app-id": "f55663ad",
        "x-app-key": "588db5b40c0c827f5af2785681421696",
        "x-remote-user-id": "0",
        "content-type": "application/json"
      },
      data: data,
      params: params
    });
  };

  componentDidMount() {
    this.getNutrients();
  }

  render() {
    return (
      <div>
        <FoodDetail
          type={this.state.type}
          id={this.state.id}
          getDetails={this.getDetails}
          getValue={this.getValue}
          nutrients={this.state.nutrients}
        ></FoodDetail>
      </div>
    );
  }
}
export default TestApp;
