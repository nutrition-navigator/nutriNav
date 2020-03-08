import React, { Component } from "react";
import {
  faExchangeAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {NavLink} from 'react-router-dom';
import Nav from '../components/Nav';

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
    return this.state.isReady ? (
      <div className="detailPage">
        <Nav />
        <div className="wrapper">
          <div className="detail">
            <div className="detailInfoContainer">
              <div className="detailTitle">
                <h1> {this.state.food.name}</h1>
              </div>

              <div className="detailDescription">
                <h2>Description</h2>
                <ul>
                  <li>
                    Serving: {this.state.food.serving}{" "}
                    {this.state.food.servingUnit} (
                    {this.state.food.servingWeight}
                    g){" "}
                  </li>
                  <li>Raw State: {this.state.food.isRaw} </li>
                  {this.state.food.brand ? (
                    <li> Brand: {this.state.food.brand} </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>

              <div className="detailIngredients">
                <div className="detailMainIngredients">
                  <h2>Main Nutrients</h2>
                  <ul>
                    {this.state.foodNutrients.map(nutrient => {
                      return (
                        <li key={nutrient.id}>
                          <span className={nutrient.value ? "row" : "row null"}>
                            <span className="col1">{nutrient.name}</span>
                            <span className="col2">{nutrient.value}</span>
                            <span className="col3">{nutrient.unit} </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="detailOtherIngredients">
                  <h2>Secondary Nutrients</h2>
                  <ul>
                    {this.state.food.others.map(other => {
                      return (
                        <li key={other.name}>
                          <span className={other.value ? "row" : "row null"}>
                            <span className="col1">{other.name}</span>
                            <span className="col2">{other.value}</span>
                            <span className="col3">{other.unit} </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="detailImgContainer">
              <div className="detailImg">
                <img src={this.state.food.url} alt={this.state.food.name}></img>
              </div>
            </div>
          </div>

          <div className="detailControl">
              <button onClick={() => {this.props.addToSaved(this.props.id, "compares")}}> Add to Compare </button>    


          </div>
        </div>
      </div>
    ) : (
      "future loader"
    );
  }
}
export default FoodDetail;
