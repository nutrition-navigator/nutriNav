import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes
} from '@fortawesome/free-solid-svg-icons';

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
									{secondNutrient.value} {secondNutrient.unit}
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
									{nutrient.value} {nutrient.unit}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<button
				title="Click to remove"
				aria-label="Click to remove from Item Comparison"
				onClick={() => {
					props.removeItem(props.id, 'userCompared');
				}}
			>
				<FontAwesomeIcon className="deleteIcon" icon={faTimes} />
			</button>
		</div>
	);
}

export default ComparisonCard;
