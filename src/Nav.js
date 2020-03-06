import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHome, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li className="navIcon"><FontAwesomeIcon icon={faHome} /></li>
            <li className="navIcon"><FontAwesomeIcon icon={faHeart} /></li>
            <li>LOGO</li>
            <li className="navIcon"><FontAwesomeIcon icon={faSearch} /></li>
            <li className="navIcon"><FontAwesomeIcon icon={faExchangeAlt} /></li>
          </ul>

        </nav>
      </div>
    )
  }
}

export default Nav; 
