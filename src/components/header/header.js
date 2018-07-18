import './header.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-logo.png';

require('dotenv').config();

class Header extends Component {
  constructor(props){
    super(props);
    this.state={loggedin: false}
  }

  render() {
    const ENV = {};

    ENV.isProduction = window.location.protocol === 'https:';
    ENV.productionApiUrl = 'https://shred-fellows-server.herokuapp.com';
    ENV.developmentApiUrl = 'http://localhost:3000';
    ENV.apiURL = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

    let githubURL = "https://github.com/login/oauth/authorize";

    let options = {
      client_id: '252d0f262488210326f6',
      scope: 'user,user:email',
      redirect_uri: `${ENV.apiURL}/oauth`,
    }

    let QueryString = Object.keys(options).map((key, i) => {
      return `${key}=` + encodeURIComponent(options[key]);
    }).join("&");

    let authURL = `${githubURL}?${QueryString}`;
      // res.redirect('https://github.com/login/oauth/authorize?client_id=252d0f262488210326f6&scope=user,user:email&redirect_uri=http://localhost:3000/oauth');
    
    return (
      <header className="header">
        <FontAwesomeIcon icon={faBars}/>
        <img alt="shred fellows logo" src={sflogo}/>
        <a href={authURL}>LOGIN OR SIGNUP</a>
        <img className="gh-logo" alt="github octocat logo" src={ghlogo} />
        <button onClick={this.login}>Log In</button>
      </header>
    );
  }
}

export default Header;