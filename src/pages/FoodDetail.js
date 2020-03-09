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
      isReady: false
    };
  }

  componentDidMount() {
    const food = this.props.getFood(this.props.id, this.props.type);
    this.setState({
      food
    }, () => {
      console.log(this.state.food);
      this.setState({
        // isReady: true,
      })
    })       
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
