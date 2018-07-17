import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-solid-svg-icons';

import sflogo from '../../assets/img/shred-logo.png';

import './header.css';

class Header extends Component {

  render() {
    return (
      <header className="header">
          <FontAwesomeIcon icon={faBars}/>
          <img alt="shred fellows logo" src={sflogo}/>
          {/* <FontAwesomeIcon icon={faGithub}/> */}
      </header>
    );
  }
}

export default Header;