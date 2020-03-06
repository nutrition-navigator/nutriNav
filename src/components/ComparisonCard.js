import React from 'react';

function ComparisonCard(props) {
  return (
    <div className="comparisonCard">
      <div className="imageContainer">
        <img src={props.food.imgURL} alt={props.food.name} />
      </div>
      <h3>{props.food.name}</h3>
      <h4>Ingredients</h4>
      <p>{props.food.nutrients}</p>
      <button>REMOVE</button>
    </div>
  );
}

export default ComparisonCard;