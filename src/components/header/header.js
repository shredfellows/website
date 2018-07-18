import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-logo.png';
import './header.css';

class Header extends Component {
  constructor(props){
    super(props);
      this.state={loggedin: false}
  }



  render() {
    return (
      <header className="header">
          <FontAwesomeIcon icon={faBars}/>
          <img alt="shred fellows logo" src={sflogo}/>
          <button onClick={this.signup}>Sign Up</button>
          <button onClick={this.login}>Log In</button>
          <img className="gh-logo" alt="github octocat logo" src={ghlogo}/>
      </header>
    );
  }
}

export default Header;