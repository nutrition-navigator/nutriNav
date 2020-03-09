import React from 'react';

function ComparisonCard(props) {
  return (
    <div className="comparisonCard">
      <div className="imageContainer">
        <img src={props.food.imgURL} alt={props.food.name} />
      </div>
      <h3>{props.food.name}</h3>
      <h4>Main Nutrients</h4>
      {props.food.mainNutrients.map(nutrient => {
        return(
          <li key={nutrient.id}>
            <p>{nutrient.name}: {nutrient.value} {nutrient.unit}</p>
          </li>
        )
      })}
      <h4>Secondary Nutrients</h4>
      {props.food.secondaryNutrients.map(secondNutrient => {
        return(
          <li key={secondNutrient.name}>
            <p>{secondNutrient.name}: {secondNutrient.value} {secondNutrient.unit}</p>
          </li>
        )
      })}
      <button onClick={ () => {props.removeItem(props.id, 'compares')}}>REMOVE</button>
    </div>
  );
}

export default ComparisonCard;
