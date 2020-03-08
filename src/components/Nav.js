import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExchangeAlt,
	faHome,
	faHeart,
	faSearch
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import logo from '../assets/nutriNavLogo.svg';

class Nav extends Component {
	render() {
		return (
			<div className="navigation">
				<div className="wrapper">
					<nav>
						<ul className="navContainer">
							<div className="navList">
								<li className="navItem">
									<NavLink to="/" exact>
										<FontAwesomeIcon icon={faHome} />
									</NavLink>
								</li>
								<li className="navItem">
									<NavLink to="/favourites">
										<FontAwesomeIcon icon={faHeart} />
									</NavLink>
								</li>
							</div>
							<div className="navList">
								<li className="navLogo">
									<NavLink to="/" exact>
										<img src={logo} alt="" />
									</NavLink>
								</li>
							</div>

							<div className="navList">
								<li className="nav-icon navItem">
									<NavLink to="/" exact>
										<FontAwesomeIcon icon={faSearch} />
									</NavLink>
								</li>
								<li className="nav-icon navItem">
									<NavLink to="/compare">
										{' '}
										<FontAwesomeIcon icon={faExchangeAlt} />
									</NavLink>
								</li>
							</div>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

export default Nav;
