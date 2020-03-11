import React, { Component } from 'react';
import { faExchangeAlt, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
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

	removeFocus = e => {
		e.target.blur();
	};

	render() {
		return this.state.isReady ? (
			<div className="detailPage">
				<Nav />

				<div className="detailContainer">
					<div className="wrapper">
						<div className="detailContent">
							<div className="detailIntro">
								<div className="introLeft">
									<div className="detailImg">
										<img
											src={this.state.food.imgURL}
											alt={this.state.food.name}
										></img>
									</div>
									<div className="detailDesc">
										<div className="detailTitle">
											<h1> {this.state.food.name}</h1>
										</div>

										<div className="detailDescription">
											<h2>Description</h2>
											<ul>
												<li>
													<p>
														<span className="nutrientName">Serving:</span>{' '}
														{this.state.food.serving}{' '}
														{this.state.food.servingUnit} (
														{this.state.food.servingWeight}
														g){' '}
													</p>
												</li>

												{this.state.food.brand ? (
													<li>
														<p>Brand: {this.state.food.brand}</p>
													</li>
												) : (
													''
												)}
											</ul>
										</div>
									</div>
								</div>

								<div className="introRight">
									<div className="detailButtons">
                    <button
                      title="Add to Favourites"
                      aria-label="Add to Favourites"
                      >
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={(e) => {
                          this.props.addToSaved(
                            this.state.food,
                            'userFavourites'
                          );
													e.target.parentNode.blur()
                        }}
                      />
                    </button>
                    <button
                      title="Add to Compare"
                      aria-label="Add to Compare"
                      >
                      <FontAwesomeIcon
                        icon={faExchangeAlt}
                        onClick={(e) => {
                          this.props.addToSaved(this.state.food, 'userCompared');
													e.target.parentNode.blur()
                        }}
                      />
                    </button>
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
														<div className="nutrientName">
															<p>{other.name}</p>
														</div>
														<div className="nutrientUnit">
															<p>
																{other.value} {other.unit}
															</p>
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
														<div className="nutrientName">
															<p>{nutrient.name}</p>
														</div>
														<div className="nutrientUnit">
															<p>
																{nutrient.value} {nutrient.unit}
															</p>
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
			</div>
		) : (
			<div className="detailPage">
				<Nav />
				<div className="detailContainer">
					<div className="wrapper">
						<div className="spinner">
								<FontAwesomeIcon
									icon={faSpinner}
								/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default FoodDetail;
