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
      search: "cheese",
      food: {},
      nutrients: []
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
          console.log(this.state.nutrients);
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

  getDetails = (id, givenType) => {
    console.log(givenType);
    let setting = {};
    if (givenType === "common") {
      setting = {
        url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        method: "POST",
        headers: {
          "x-app-id": "88ae7cda",
          "x-app-key": "cdddd74c181520e189039715e81472db",
          "x-remote-user-id": "0",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          query: id
        }
      };
    } else {
      setting = {
        url: `https://trackapi.nutritionix.com/v2/search/item`,
        method: "GET",
        headers: {
          "x-app-id": "88ae7cda",
          "x-app-key": "cdddd74c181520e189039715e81472db",
          "x-remote-user-id": "0"
        },
        params: {
          nix_item_id: id
        }
      };
    } 
    return axios(setting);
  };

  componentDidMount() {
    this.getNutrients();
  }

  render() {
    console.log("render 1");
    return (
      <div>
        {this.state.nutrients.length > 0 ? (
          <FoodDetail
            nutrients={this.state.nutrients}
            foodType={this.state.type}
            getDetails={this.getDetails}
            getValue={this.getValue}
            id={this.state.search}
          ></FoodDetail>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TestApp;
