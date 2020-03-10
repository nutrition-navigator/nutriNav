import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons';

class FavouriteCard extends Component {
  render() {
    let id = this.props.foodItem.id
    id=encodeURI(id)
    const type = this.props.foodItem.brand ? "branded" : "common";
    console.log(type);
    return (
      <Link to={`/food/${type}/${id}`}>
        <div className="foodCard">
          <button
            z-index="300"
            onClick={() => {
              this.props.removeItem(this.props.foodItem.key, "userFavourites");
            }}
          >
            <FontAwesomeIcon className="deleteIcon" icon={faTimes} />
          </button >
          <div className="cardImage">
            <img src={this.props.foodItem.imgURL} alt={this.props.foodItem.name} />
          </div>

          <div className="cardContent">
            <h2 className="cardTitle">{this.props.foodItem.brand ? this.props.foodItem.brand : this.props.foodItem.name}</h2>
            {this.props.foodItem.brand ? <h3 className="cardSubtitle">{this.props.foodItem.name}</h3> : null}
            
          </div>
        </div>
      </Link>
    );
  }
}

export default FavouriteCard;
