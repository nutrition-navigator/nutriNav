import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Favourites from "./pages/Favourites";
import FoodDetail from "./pages/FoodDetail";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Toaster from "./components/Toaster";
import firebase from "./firebaseConfig";
import "./App.css";
import creds from "./apiKey";

class App extends Component {
  constructor() {
    super();
    this.state = {
      // target nutrients from the Client Brief (initially without ids)
      targetNutrients: [
        { name: "Vitamin A", unit: "IU" },
        { name: "Vitamin D", unit: "IU" },
        { name: "Vitamin B-6", unit: "mg" },
        { name: "Vitamin C", unit: "mg" },
        { name: "Vitamin E", unit: "mg" },
        { name: "Magnesium", unit: "mg" },
        { name: "Zinc", unit: "mg" },
        { name: "Iron", unit: "mg" },
      ],
      commonFood: [],
      brandedFood: [],
      nutrients: [], // target nutrients with ids
      userFavourites: [],
      userCompared: [],
      type: "branded",
      toaster: {
        hidden: true
      }
    };
  }

  componentDidMount() {
    this.getNutrients(); // get nutrients from API in raw state
    this.randomSearch();
    this.getAllSaved("userCompared");
  }
  
  getAllSaved = state => {
    const dbRef = firebase.database().ref(`${state}`);
    dbRef.on("value", response => {
      const savedFromDB = response.val();
      const arraySaved = [];
      for (let key in savedFromDB) {
        arraySaved.push({
          key: key,
          id: savedFromDB[key].id,
          name: savedFromDB[key].name,
          brand: savedFromDB[key].brand,
          serving: savedFromDB[key].serving,
          servingUnit: savedFromDB[key].servingUnit,
          servingWeight: savedFromDB[key].servingWeight,
          imgURL: savedFromDB[key].imgURL,
          mainNutrients: savedFromDB[key].mainNutrients,
          secondaryNutrients: savedFromDB[key].secondaryNutrients
        });
      }
      console.log(arraySaved);
      this.completeSaved(arraySaved, state);
    });
  };


  completeSaved = (data, state) => {
      this.setState({
        [state]: data,
      })
  }

  runToaster = (message, overall, duration) => {

  }

  addToSaved = (food, state) => {
    console.log('addToSaved() ', food);
    if (this.isNotDuplicate(food.id, state)) {
      const dBCompRef = firebase.database().ref(`${state}`);
      dBCompRef.push(food);
      // this.setState(
      //   {
      //     toaster: {
      //       hidden: false,
      //       message: `This food has been successfully saved to your ${state}`,
      //       overall: "SUCCESS",
      //       duration: 5000
      //     }
      //   },
      //   () => this.killToaster(this.state.toaster.duration)
      // );
    } else {

    }
  };

  isNotDuplicate = (id, state) => {
    // console.log(this.state.userCompared, this.state.userFavourites);
    // console.log("isNotDuplicate() state: ", state);
    const copySaved =
      state === "userCompared"
        ? [...this.state.userCompared]
        : [...this.state.userFavourites];
    // console.log("savedList: ", copySaved);
    const result = copySaved.filter(food => {
      return food.id === id;
    });
    // console.log("length is", result.length);
    return result.length === 0;
  };

  // retrieves the most up to date nutrients from API and their ids, maps the ids to the target nutrient list
  getNutrients = () => {
    console.log("getNutrients()");
    let nutrientsAPI = [];
    axios({
      url: "https://trackapi.nutritionix.com/v2/utils/nutrients",
      method: "GET",
      responseType: "json",
      headers: {
        "x-app-key": creds.key,
        "x-app-id": creds.id,
        "x-remote-user-id": "0"
      }
    }).then(response => {
      nutrientsAPI = response.data;
      // transforms each target nutrient into an object which includes the nutrient's id
      // stores these objects in a temporary array
      const tempNutrients = this.state.targetNutrients.map(nutrient => {
        return {
          name: nutrient.name,
          id: this.getNutrientID(nutrient.name, nutrientsAPI),
          unit: nutrient.unit
        };
      });
      // updates the nutrients state with the temporary array
      this.setState({
        nutrients: tempNutrients
      }, () => {console.log('nutrients in app.js', this.state.nutrients)});
    });
  };

  // retrieves the id of a nutrient from a given nutrient list, using the name
  getNutrientID = (name, nutrientsAPI) => {
    const tempNutrient = nutrientsAPI.filter(nutrient => {
      return nutrient.usda_nutr_desc.includes(name);
    });
    return tempNutrient.length > 0 ? tempNutrient[0].attr_id : "";
  };

  // retrieves the amount/value of a nutrient from a given nutrient list, using the id
  getValue = (id, foodNutrients) => {
    const tempNutrient = foodNutrients.filter(nutrient => {
      return nutrient.attr_id === id;
    });
    return tempNutrient.length > 0 ? tempNutrient[0].value : 0;
  };

  othersToArray = others => {
    const otherNutrients = [];
    for (let key in others) {
      otherNutrients.push({
        name: key,
        value: others[key].value,
        unit: others[key].unit
      });
    }
    return otherNutrients;
  };

  completeFood = (food, nutrients) => {

    console.log('completeFood() app.js   food: ', food, 'nutrients', nutrients);
    const completedFood = {
      id: food.nix_item_id ? food.nix_item_id : food.food_name,
      name: food.food_name,
      brand: food.brand_name,
      imgURL: food.photo.highres ? food.photo.highres : food.photo.thumb,
      serving: Math.round(food.serving_qty),
      servingUnit: food.serving_unit,
      servingWeight: food.serving_weight_grams,
      mainNutrients: [...nutrients],
      // other non-critical nutrients mentioned in the Client Brief
      secondaryNutrients: {
        Calories: { value: Math.round(food.nf_calories), unit: "kcal" },
        Carbs: {
          value: Math.round(food.nf_total_carbohydrate),
          unit: "g"
        },
        Sodium: { value: Math.round(food.nf_sodium), unit: "mg" },
        Sugar: { value: Math.round(food.nf_sugars), unit: "g" },
        Protein: { value: Math.round(food.nf_protein), unit: "g" },
        Fat: { value: Math.round(food.nf_total_fat), unit: "g" },
        "Saturated Fat": {
          value: Math.round(food.nf_saturated_fat),
          unit: "g"
        },
        Fiber: {
          value: Math.round(food.nf_dietary_fiber),
          unit: "g"
        }
      }  
    };
    const secondary = completedFood.secondaryNutrients;
    completedFood.secondaryNutrients = this.othersToArray(secondary);
    console.log('completedFood', completedFood);
    return completedFood;
  };

  // receives a food item and returns its completed main nutrient list with name, value, id, and measure unit
  completeFoodNutrients = food => {
    const completeNutrients = this.state.nutrients.map(nutrient => {
      // calls a function from props that maps this nutrient to its value
      const value = this.getValue(nutrient.id, food.full_nutrients);
      // returns the completed nutrient profile as an object to exist in the completedNutrients array
      return {
        name: nutrient.name,
        id: nutrient.id,
        value: Math.round(value),
        unit: nutrient.unit
      };
    });
    return completeNutrients;
  };

  // gets the details about a food item from the API based on the id(nix or food_name) and type(common vs branded)
  // caller must resolve the promise on their own
  getDetails = (id, type) => {
    console.log("getDetails() with type: ", type);
    const urlEndpoint = type === "common" ? "natural/nutrients" : "search/item";
    const method = type === "common" ? "POST" : "GET";
    const params = type === "common" ? {} : { nix_item_id: id };
    const data = type === "common" ? { query: id } : {};
    return axios({
      url: `https://trackapi.nutritionix.com/v2/${urlEndpoint}`,
      method: method,
      headers: {
        "x-app-key": creds.key,
        "x-app-id": creds.id,
        "x-remote-user-id": "0",
        "content-type": "application/json"
      },
      data: data,
      params: params
    });
  };

  fetchFood = query => {
    console.log("fetchFood()");
    axios({
      url: "https://trackapi.nutritionix.com/v2/search/instant",
      method: "get",
      headers: {
        "x-app-key": creds.key,
        "x-app-id": creds.id
      },
      params: {
        query
      }
    }).then(res => {
      this.setState({
        brandedFood: res.data.branded,
        commonFood: res.data.common
        // userFavourites: res.data.common
      });
    });
  };

  randomSearch = () => {
    const randomArray = ["corn", "cheese", "spinach", "big mac"];
    const randomInteger = Math.floor(Math.random() * 4);
    this.fetchFood(randomArray[randomInteger]);
  };

  userSearch = e => {
    const query = e.target.value;
    this.fetchFood(query);
  };

  foodTypeButtonClick = e => {
    this.setState(
      {
        type: e.target.id
      },
      () => console.log(this.state.type)
    );
  };
<<<<<<< HEAD

  killToaster = duration => {
    console.log("kill Toaster");
    setTimeout(() => {
      console.log("timeout");
      this.setState(
        {
          toaster: {
            hidden: true
          }
        },
        () => {
          console.log(this.state.toaster);
        }
      );
    }, duration);
  }

=======
>>>>>>> master
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  foodItems={
                    this.state.type === "branded"
                      ? this.state.brandedFood
                      : this.state.commonFood
                  }
                  userSearch={this.userSearch}
                  foodTypeButtonClick={this.foodTypeButtonClick}
                />
              )}
            />
            <Route
              path="/favourites"
              render={() => (
                <Favourites savedFoods={this.state.userFavourites} />
              )}
            />
            <Route path="/compare" component={Compare} />
            <Route
              exact
              path="/food/:id"
              render={props => (
                <FoodDetail
                  id={props.match.params.id}
                  type={this.state.type}
                  getDetails={this.getDetails}
                  completeFoodNutrients={this.completeFoodNutrients}
                  completeFood={this.completeFood}
                  addToSaved={this.addToSaved}
                ></FoodDetail>
              )}
            />
          </header>
          <div
            className={
              this.state.toaster.hidden
                ? "toasterContainer hidden"
                : "toasterContainer"
            }
          >
            <Toaster
              overall={this.state.toaster.overall}
              message={this.state.toaster.message}
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
