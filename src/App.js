import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Favourites from './pages/Favourites';
import FoodDetail from './pages/FoodDetail';
import Compare from './pages/Compare';
import Home from './pages/Home';
import firebase from './firebaseConfig';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			// target nutrients from the Client Brief (initially without ids)
			targetNutrients: [
				{ name: 'Vitamin A', unit: 'IU' },
				{ name: 'Vitamin D', unit: 'IU' },
				{ name: 'Vitamin B-6', unit: 'mg' },
				{ name: 'Vitamin C', unit: 'mg' },
				{ name: 'Vitamin E', unit: 'mg' },
				{ name: 'Magnesium', unit: 'mg' },
				{ name: 'Zinc', unit: 'mg' },
				{ name: 'Iron', unit: 'mg' },
				{ name: 'Fiber', unit: 'g' }
			],
			commonFood: [],
			brandedFood: [],
			nutrients: [], // target nutrients with ids
			userFavourites: [],
			userCompared: [],
			type: 'branded'
		};
	}

	componentDidMount() {
		this.getNutrients(); // get nutrients from API in raw state
		this.randomSearch();
		this.getAllSaved('compares');
	}

	getAllSaved = state => {
		const dbRef = firebase.database().ref(`${state}`);
		dbRef.on('value', response => {
			const savedFromDB = response.val();
			const arraySaved = [];
			for (let key in savedFromDB) {
				arraySaved.push({
					key: key,
					id: savedFromDB[key].id,
					type: savedFromDB[key].type
				});
			}
			this.completeSaved(arraySaved, state);
		});
	};

	completeSaved = (foods, state) => {
		const completedArray = [];
		foods.forEach(food => {
			this.getDetails(food.id, food.type).then(response => {
				// complete the nutrients for this food
				const completedNutrients = this.completeFoodNutrients(
					response.data.foods[0]
				);

				// complete the metadata for this food
				const completedFood = this.completeFood(
					response.data.foods[0],
					completedNutrients
				);

				// push this food into our accumalitve array that will be used to change state eventually
				completedArray.push({
					key: food.key,
					id: food.id,
					imgURL: completedFood.url,
					mainNutrients: completedNutrients,
					secondaryNutrients: completedFood.others
				});
			});
		});
		if (state === 'compares') {
			this.setState(
				{
					userCompared: completedArray
				},
				() => {
					console.log(this.state.userCompared);
				}
			);
		} else {
			this.setState({
				userFavourites: completedArray
			});
		}
	};

	addToSaved = (id, state) => {
		const dBCompRef = firebase.database().ref(`${state}`);
		dBCompRef.push({ id: id, type: this.state.type });
	};

	// retrieves the most up to date nutrients from API and their ids, maps the ids to the target nutrient list
	getNutrients = () => {
		let nutrientsAPI = [];
		axios({
			url: 'https://trackapi.nutritionix.com/v2/utils/nutrients',
			method: 'GET',
			responseType: 'json',
			headers: {
				'x-app-id': 'f55663ad',
				'x-app-key': '588db5b40c0c827f5af2785681421696',
				'x-remote-user-id': '0'
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
		return tempNutrient.length > 0 ? tempNutrient[0].attr_id : '';
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
			name: food.food_name,
			brand: food.brand_name,
			url: food.photo.highres ? food.photo.highres : food.photo.thumb,
			isRaw: food.metadata.is_raw_food ? 'Yes' : 'No',
			serving: food.serving_qty,
			servingUnit: food.serving_unit,
			servingWeight: food.serving_weight_grams,
			// other non-critical nutrients mentioned in the Client Brief
			others: {
				Calories: { value: Math.round(food.nf_calories), unit: 'kcal' },
				Carbs: {
					value: Math.round(food.nf_total_carbohydrate),
					unit: 'g'
				},
				Sodium: { value: Math.round(food.nf_sodium), unit: 'mg' },
				Sugar: { value: Math.round(food.nf_sugars), unit: 'g' },
				Protein: { value: Math.round(food.nf_protein), unit: 'g' },
				Fat: { value: Math.round(food.nf_total_fat), unit: 'g' },
				'Saturated Fat': {
					value: Math.round(food.nf_saturated_fat),
					unit: 'g'
				},
				Fiber: {
					value: Math.round(
						// uses the fiber from the main nutrients
						nutrients.filter(n => n.name === 'Fiber')[0].value
					),
					unit: 'g'
				}
			}
		};
		const others = completedFood.others;
		completedFood.others = this.othersToArray(others);
		return completedFood;
	};

	// receives a food item and returns its completed main nutrient list with name, value, id, and measure unit
	completeFoodNutrients = food => {
		const completeNutrients = this.state.nutrients.map(nutrient => {
			// calls a function from props that maps this nutrient to its value using another axios call
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
		const axiosType = type ? type : this.state.type;
		const urlEndpoint =
			axiosType === 'common' ? 'natural/nutrients' : 'search/item';
		const method = axiosType === 'common' ? 'POST' : 'GET';
		const params = axiosType === 'common' ? {} : { nix_item_id: id };
		const data = axiosType === 'common' ? { query: id } : {};
		return axios({
			url: `https://trackapi.nutritionix.com/v2/${urlEndpoint}`,
			method: method,
			headers: {
				'x-app-id': 'f55663ad',
				'x-app-key': '588db5b40c0c827f5af2785681421696',
				'x-remote-user-id': '0',
				'content-type': 'application/json'
			},
			data: data,
			params: params
		});
	};

	fetchFood = query => {
		axios({
			url: 'https://trackapi.nutritionix.com/v2/search/instant',
			method: 'get',
			headers: {
				'x-app-key': 'cdddd74c181520e189039715e81472db',
				'x-app-id': '88ae7cda'
			},
			params: {
				query
			}
		}).then(res => {
			this.setState({
				brandedFood: res.data.branded,
				commonFood: res.data.common,
				userFavourites: res.data.common
			});
		});
	};

	randomSearch = () => {
		const randomArray = ['corn', 'cheese', 'spinach', 'big mac'];
		const randomInteger = Math.floor(Math.random() * 4);
		this.fetchFood(randomArray[randomInteger]);
	};

	userSearch = e => {
		const query = e.target.value;
		this.fetchFood(query);
	};

	foodTypeButtonClick = e => {
		this.setState({
			type: e.target.id
		});
	};

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
										this.state.type === 'branded'
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
									getDetails={this.getDetails}
									completeFoodNutrients={this.completeFoodNutrients}
									completeFood={this.completeFood}
									// addToFavourites={this.addToFavourites}
									addToSaved={this.addToSaved}
								></FoodDetail>
							)}
						/>
					</header>
				</div>
			</Router>
		);
	}
}

export default App;
