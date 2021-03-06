import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Favourites from "./pages/Favourites";
import FoodDetail from "./pages/FoodDetail";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Toaster from "./components/Toaster";
import firebase from "./firebaseConfig";
import "./App.css";
// import creds from "./apiKey";

const creds = {
  key: "b41ff95cf26bdcca769374b7487a2397",
  id: "f55663ad"
};

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
        { name: "Iron", unit: "mg" }
      ],
      commonFood: [],
      brandedFood: [],
      nutrients: [], // target nutrients with ids
      userFavourites: [],
      userFavouritesFilt: [],
      filterString: "",
      userCompared: [],
      type: "common",
      maxCompared: 3,
      maxFavourites: 18,
      toaster: {
        hidden: true
			},
			hasUserTyped:false
    };
  }

  componentDidMount() {
    this.getNutrients(); // get nutrients from API in raw state
    this.randomSearch();
    this.getAllSaved("userCompared");
    this.getAllSaved("userFavourites");
  }

  // listens for changes to firebase and updates state
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
      this.completeSaved(arraySaved, state);
    });
  };
  // saves the incoming firebase data to state
  completeSaved = (data, state) => {
    this.setState(
      {
        [state]: data,
        [state + `Filt`]: data
      });
  };

  // adds a toaster to the UI
  runToaster = ({ overall, message, duration }) => {
    this.setState(
      {
        toaster: {
          hidden: false,
          message: message,
          overall: overall
        }
      },
      () => this.killToaster(duration)
    );
  };

  // removes the toaster from the UI
  killToaster = duration => {
    setTimeout(() => {
      this.setState({
        toaster: {
          hidden: true
        }
      });
    }, duration);
  };

  // adds a food item to saved (checks for duplicates and against max amounts)
  addToSaved = (food, state) => {
    const max =
      state === "userCompared"
        ? this.state.maxCompared
        : this.state.maxFavourites;
    if (this.isNotDuplicate(food.id, state) && this.state[state].length < max) {
      const dBCompRef = firebase.database().ref(`${state}`);
      dBCompRef.push(food);
      this.runToaster({
        overall: `SUCCESS`,
        message: `Your food (${food.name}) has been saved.`,
        duration: 2500
      });
    } else {
      this.isNotDuplicate(food.id, state)
        ? this.runToaster({
            overall: `SAVE FAILED`,
            message: `Unable to add. The list is full`,
            duration: 2500
          })
        : this.runToaster({
            overall: `SAVE FAILED`,
            message: `This food (${food.name}) is already saved.`,
            duration: 2500
          });
    }
  };

  // checks if food item already exists in saved
  isNotDuplicate = (id, state) => {
    const copySaved =
      state === "userCompared"
        ? [...this.state.userCompared]
        : [...this.state.userFavourites];

    const result = copySaved.filter(food => {
      return food.id === id;
    });
    return result.length === 0;
  };

  // removes a food item from saved
  removeItem = (key, state) => {
    const dbRef = firebase.database().ref(state);
    dbRef.child(key).remove();
    this.runToaster({
      overall: `SUCCESS`,
      message: `The food item has been removed.`,
      duration: 2500
    });
  };

  // retrieves the most up to date nutrients from API and their ids, maps the ids to the target nutrient list
  getNutrients = () => {
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
      });
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
        commonFood: res.data.common,
        hasUserTyped: true,
      });
    });
  };

	// Function to random decide some initial search results on page load
	randomSearch = () => {
		const randomArray = ['corn', 'spinach', 'burger', 'broccoli'];
		const randomInteger = Math.floor(Math.random() * randomArray.length);
		this.fetchFood(randomArray[randomInteger]);
	};

	// Function that tracks which letters the user is typing into the search bar
	userSearch = e => {
		const query = e.target.value;
    this.fetchFood(query);
	};

  // Function to switch between displaying either commmon foods or branded foods to the user.
  foodTypeButtonClick = e => {
    this.setState({
      type: e.target.id
    });
  };

  // filters favourites by received keyword
  updateFilterString = string => {
    const filteredData = this.state.userFavourites.filter(food => {
      return food.name.toLowerCase().includes(string.toLowerCase());
    });
    this.setState({
      userFavouritesFilt: filteredData
    });
	};
	
	// brings the saved favourites into an unfiltered state
	resetFilter = () => {
		this.setState({
			filterString: '',
			userFavouritesFilt: this.state.userFavourites,
		})
	}

  render() {
    return (
      <Router basename="/">
        <div className="App">
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
								type={this.state.type}
								resetFilter={this.resetFilter}
								hasUserTyped={this.state.hasUserTyped}
              />
            )}
          />
          <Route
            path="/favourites"
            render={() => (
              <Favourites
                savedFoods={this.state.userFavouritesFilt}
                updateFilterString={this.updateFilterString}
								removeItem={this.removeItem}
								resetFilter={this.resetFilter}
              />
            )}
          />
          <Route
            path="/compare"
            render={() => (
              <Compare
                userCompared={this.state.userCompared}
								removeItem={this.removeItem}
								resetFilter={this.resetFilter}
              />
            )}
          />
          <Route
            exact
            path="/food/:type/:id"
            render={props => (
              <FoodDetail
                id={props.match.params.id}
                type={props.match.params.type}
                getDetails={this.getDetails}
                completeFoodNutrients={this.completeFoodNutrients}
                completeFood={this.completeFood}
								addToSaved={this.addToSaved}
								resetFilter={this.resetFilter}
              ></FoodDetail>
            )}
          />
          <div
            className={
              this.state.toaster.hidden
                ? "toasterContainer hide"
                : "toasterContainer show"
            }
          >
            <Toaster
              overall={this.state.toaster.overall}
              message={this.state.toaster.message}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
