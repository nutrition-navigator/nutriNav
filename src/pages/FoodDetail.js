import React, { Component } from 'react';
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Nav from '../components/Nav';

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

        <div className="detailContainer">
          <div className="wrapper">
            <div className="detailContent">
              <div className="detailIntro">
                <div className="detailImg">
                  <img src={this.state.food.imgURL} alt={this.state.food.name}></img>
                </div>
                <div className="detailDesc">
                  <div className="detailTitle">
                    <h1> {this.state.food.name}</h1>
                  </div>

                  <div className="detailDescription">
                    <h2>Description</h2>
                    <ul>
                      <li>
                        Serving: {this.state.food.serving} {this.state.food.servingUnit} ({this.state.food.servingWeight}
                        g){" "}
                      </li>
                      <li>Raw State: {this.state.food.isRaw} </li>
                      {this.state.food.brand ? <li> Brand: {this.state.food.brand} </li> : ""}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="detailNutrition">
                <h2>Nutritional Facts</h2>
                <div className="detailNutritionFacts">
                  <ul className="nutrientList">
                    {this.state.food.secondaryNutrients.map(other => {
                      return (
                        <li key={other.name}>
                          <div className="nutrient">
                            <div className="nutrientName">{other.name}</div>
                            <div className="nutrientUnit">
                              {other.value}
                              {other.unit}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="nutrientList">
                    {this.state.food.mainNutrients.map(nutrient => {
                      return (
                        <li key={nutrient.name}>
                          <div className="nutrient">
                            <div className="nutrientName">{nutrient.name}</div>
                            <div className="nutrientUnit">
                              {nutrient.value}
                              {nutrient.unit}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* <div className="detailVitsMins">
									<h2>Vitamins and Minerals</h2>
									<ul>
										{this.state.food.mainNutrients.map(nutrient => {
											return (
												<li key={nutrient.id}>
													<span className={nutrient.value ? 'row' : 'row null'}>
														<span className="col1">{nutrient.name}</span>
														<span className="col2">{nutrient.value}</span>
														<span className="col3">{nutrient.unit} </span>
													</span>
												</li>
											);
										})}
									</ul>
								</div> */}
              </div>
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
            Add to Compare{" "}
          </button>
          <button
            onClick={() => {
              this.props.addToSaved(this.state.food, "userFavourites");
            }}
          >
            {" "}
            Add to Favourites{" "}
          </button>
        </div>
      </div>
    ) : (
      "future loader"
    );
	}
}
export default FoodDetail;
