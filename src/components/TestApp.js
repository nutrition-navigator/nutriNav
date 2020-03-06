import React, { Component } from "react";
import axios from "axios";
import FoodDetail from "../pages/FoodDetail";

class TestApp extends Component {
  constructor() {
    super();
    this.state = {
      targetNutrients: [
        {name: "Vitamin A", unit: "IU"},
        {name: "Vitamin D", unit: "IU"},
        {name: "Vitamin B-6", unit: "mg"},
        {name: "Vitamin C", unit: "mg"},
        {name: "Vitamin E", unit: "mg"},
        {name: "Magnesium", unit: "mg"},
        {name: "Zinc", unit: "mg"},
        {name:"Iron", unit: "mg"},
        {name: "Fiber", unit: "g"}
      ],
      showIDs: false,
      type: "common",
      search: "cheese", // from input
      food: {},
      showValues: false,
      nutrientsValues: [],
      nutrients: [
        { name: 'Vitamin A', id: 318 },
        { name: 'Vitamin D', id: 324 },
        { name: 'Vitamin B-6', id: 415 },
        { name: 'Vitamin C', id: 401 },
        { name: 'Vitamin E', id: 323},
        { name: 'Magnesium', id: 304},
        { name: 'Zinc', id: 309 },
        { name: 'Iron', id: 303 },
        { name: 'Fiber', id: 291 }
      ]
    };
  }

  // getNutrients = () => {
  //   let nutrientsAPI = [];
  //   axios({
  //     url: "https://trackapi.nutritionix.com/v2/utils/nutrients",
  //     method: "GET",
  //     responseType: "json",
  //     headers: {
  //       "x-app-id": "f55663ad",
  //       "x-app-key": "8a4711b9498f267927ad120c76ab8808",
  //       "x-remote-user-id": "0"
  //     }
  //   }).then(response => {
  //     nutrientsAPI = response.data;
  //     const tempNutrients = this.state.targetNutrients.map(nutrientName => {
  //       return {
  //         name: nutrientName,
  //         id: this.getNutrientID(nutrientName, nutrientsAPI)
  //       };
  //     });
  //     this.setState(
  //       {
  //         nutrients: tempNutrients
  //       },
  //       () => {
  //       }
  //     );
  //   });
  // };

  // getNutrientID = (name, nutrientsAPI) => {
  //   const tempNutrient = nutrientsAPI.filter(nutrient => {
  //     return nutrient.usda_nutr_desc.includes(name);
  //   });
  //   return tempNutrient[0].attr_id;
  // };

  getValue = (id, foodNutrients) => {
    console.log('GETVALUE ID PASSED', id);
    const tempNutrient = foodNutrients.filter(nutrient => {
      return nutrient.attr_id === id;
    });
    console.log('NUTRIENT[0]VALUE', tempNutrient);
    return (tempNutrient.length > 0 )? (tempNutrient[0].value) : 0;
  };

  getDetails = (id, type) => {
    const urlEndpoint = type === "common" ? "natural/nutrients" : "search/item";
    const method = type === "common" ? "POST" : "GET";
    const params = type === "common" ? {} : {nix_item_id: id};
    const data = type === "common" ? {query: id} : {};
    return axios({
      url: `https://trackapi.nutritionix.com/v2/${urlEndpoint}`,
      method: method,
      headers: {
        "x-app-id": "f55663ad",
        "x-app-key": "8a4711b9498f267927ad120c76ab8808",
        "x-remote-user-id": "0",
        "content-type": "application/json"
      },
      data: data,
      params: params
    })
  }
     
  
        

  componentDidMount() {
    this.getDetails(this.state.search, this.state.type);
  }

  render() {
    return (
      <div>
        <FoodDetail getDetails={this.getDetails} getValue={this.getValue}></FoodDetail>
      </div>
    );
  }
}
export default TestApp;
