import React, { Component } from "react";
import { faExchangeAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";

class FoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: {},
      foodType: this.props.type,
      isReady: false
    };
  }

  componentDidMount() {
    this.props.getDetails(this.props.id, this.props.type).then(response => {
      const foodDetail = response.data.foods[0];
      const completedNutrients = this.props.completeFoodNutrients(foodDetail);
      const completedFood = this.props.completeFood(
        foodDetail,
        completedNutrients
      );
      this.setState(
        {
          food: completedFood
        },
        () => {
          this.setState({
            isReady: true
          });
        }
      );
    }); // end of .then()
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
                    Serving: {this.state.food.serving.qty}{" "}
                    {this.state.food.serving.unit} (
                    {this.state.food.serving.weight}
                    g){" "}
                  </li>
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
                    {this.state.food.mainNutrients.map(nutrient => {
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
                    {this.state.food.secondaryNutrients.map(other => {
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
                <img
                  src={this.state.food.imgURL}
                  alt={this.state.food.name}
                ></img>
              </div>
            </div>
          </div>

          <div className="detailControl">
            <button
              onClick={() => {
                this.props.addToSaved(this.state.food, "userCompared");
              }}
            >
              {" "}
              Add to Compared{" "}
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="detailControl">
        <button
          onClick={() => {
            this.props.addToSaved(this.state.food, "userCompared");
          }}
        >
          {" "}
          Add to Compared{" "}
        </button>
      </div>
    );
  }
}
export default FoodDetail;
