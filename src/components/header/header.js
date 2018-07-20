import './header.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-logo.png';
import {authURL} from '../../lib/githubLogin.js';

require('dotenv').config();

/**
 * Header component and function to render.  The header includes the shredfellows *logo and a link to github for authenticaiton.  State is set to a logged in *status of false.
 */
class Header extends Component {
  constructor(props){
    super(props);
    this.state={loggedin: false}
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBurgerClick);
  }

  handleBurgerClick = (e) => {
    let hamburgerMenu = document.getElementById('hamburger');
    let workspaceOverlay = document.getElementById('workspace-overlay');
    let sidebar = document.getElementById('sidebar');

    if (e.target === hamburgerMenu) {
      sidebar.classList.add('open-from-left');
      workspaceOverlay.classList.add('cover-screen');
    } else if (e.target === workspaceOverlay){
      sidebar.classList.remove('open-from-left');
      workspaceOverlay.classList.remove('cover-screen');
    }
  }

  render() {
    
    return (
      <header className="header">
        <FontAwesomeIcon id="hamburger" icon={faBars}/>
        <img alt="shred fellows logo" src={sflogo}/>
        <a href={authURL}>
          <img className="gh-logo" alt="github octocat logo" src={ghlogo} />
          Login
        </a>
      </header>
    );
  }
}

export default Header;