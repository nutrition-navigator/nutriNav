import React from 'react';

function ComparisonCard(props) {
  return (
    <div className="comparisonCard">
      <div className="imageContainer">
        <img src={props.food.imgURL} alt={props.food.name} />
      </div>
      <h3>{props.food.name}</h3>
      <h4>Description</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos voluptas ipsum minima totam placeat quod reprehenderit, fugiat quaerat debitis, modi ipsam distinctio nesciunt odio fugit voluptatum laborum amet deserunt labore.</p>
      <h4>Nutritional Information </h4>
      <p>{props.food.nutrients}</p>
      <button onClick={() => {props.removeItem(props.itemId)}}>REMOVE</button>
    </div>
  );
}

export default ComparisonCard;
