import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHome, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {
  render() {
    return (
      <div className="navigation">
        <nav>
          <ul className="nav-bar">
            <li className="nav-icon nav"><FontAwesomeIcon icon={faHome} /></li>
            <li className="nav-icon nav"><FontAwesomeIcon icon={faHeart} /></li>
            <li className="logo-icon nav">LOGO</li>
            <li className="nav-icon nav"><FontAwesomeIcon icon={faSearch} /></li>
            <li className="nav-icon nav"><FontAwesomeIcon icon={faExchangeAlt} /></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Nav; 
