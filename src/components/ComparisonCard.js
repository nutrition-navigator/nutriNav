import React from 'react';

function ComparisonCard(props) {
	return (
		<div className="comparisonCard">
			<div className="imageContainer">
				<img src={props.food.imgURL} alt={props.food.name} />
			</div>
			<h3>{props.food.name}</h3>
			<h4>Nutritional Facts</h4>
			<ul>
				{props.food.secondaryNutrients.map(secondNutrient => {
					return (
						<li key={secondNutrient.name}>
							<div className="nutrient">
								<div className="nutrientName">{secondNutrient.name}</div>
								<div className="nutrientUnit">
									{secondNutrient.value}
									{secondNutrient.unit}
								</div>
							</div>
						</li>
					);
				})}
			</ul>

			<h4>Vitamins and Minerals</h4>
			<ul>
				{props.food.mainNutrients.map(nutrient => {
					return (
						<li key={nutrient.id}>
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
			<button
				onClick={() => {
					props.removeItem(props.id, 'userCompared');
				}}
			>
				REMOVE
			</button>
		</div>
	);
}

export default ComparisonCard;
