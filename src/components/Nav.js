import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHome, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";


class Nav extends Component {
  render() {
    return (
      <div className="navigation">
        <nav>
          <ul className="nav-bar">
            <li className="nav-icon nav">
              <NavLink to="/" exact>
                <FontAwesomeIcon icon={faHome} />
              </NavLink>
            </li>
            <li className="nav-icon nav">
              <NavLink to="/favourites">
                {" "}
                <FontAwesomeIcon icon={faHeart} />
              </NavLink>
            </li>
            <li className="logo-icon nav">
              <NavLink to="/" exact>
                LOGO
              </NavLink>
            </li>
            <li className="nav-icon nav">
              <NavLink to="/" exact>
                <FontAwesomeIcon icon={faSearch} />
              </NavLink>
            </li>
            <li className="nav-icon nav">
              <NavLink to="/compare">
                {" "}
                <FontAwesomeIcon icon={faExchangeAlt} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav; 
