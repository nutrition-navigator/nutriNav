import React, { Component } from "react";

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      foodNutrients: [],
      isReady: false
    };
  }

  componentDidMount() {
    this.props
      // calls the a function from props that makes an axios call based on the passed id and type
      .getDetails(this.props.id, this.props.type)
      .then(response => {
        const food = response.data.foods[0];
        // saves this food's completed nutrients to state
        this.setState({
          foodNutrients: this.props.completeFoodNutrients(food)
        });
        // creates a completed food object and saves it to state
        this.setState(
          {
            food: this.props.completeFood(food, this.state.foodNutrients)
          },
          () => {
            console.log('STATE FOOD ', this.state.food);
            // removes fiber from the main nutrients because it is now part of the completed food state
            this.setState(
              {
                foodNutrients: this.state.foodNutrients.slice(
                  0,
                  this.state.foodNutrients.length - 1
                )
              },
              () => {
                this.setState({ isReady: true });
              }
            );
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      this.state.isReady ? (
      <div className="detail">
        <img src={this.state.food.url} alt={this.state.food.name}></img>
    
        <h1> {this.state.food.name}</h1>
        <h2>Main Nutrients</h2>
        <ul>
          {this.state.foodNutrients.map(nutrient => {
            return (
              <li key={nutrient.id}>
                <span className="row">
                  <span className="col1">{nutrient.name}</span>
                  <span className="col2">{nutrient.value}</span>
                  <span className="col3">{nutrient.unit} </span>
                </span>
              </li>
            );
          })}
        </ul>
        <h2>Secondary Nutrients</h2>
        <ul>
          {this.state.food.others.map(other => {
            return (
              <li key={other.name}>
                <span className="row">
                  <span className="col1">{other.name}</span>
                  <span className="col2">{other.value}</span>
                  <span className="col3">{other.unit} </span>
                </span>
              </li>
            );
          })}
        </ul>
        <button>Add To Favorites</button>
        <button>Add To Compare</button>
      </div>
      ) 
      : "" 
    );
  }
}
export default FoodDetail;
