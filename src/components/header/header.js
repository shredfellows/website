import './header.css';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-logo.png';
import {authURL} from '../../lib/githubLogin.js';

import * as utils from '../../lib/utils.js';

require('dotenv').config();

/** 
 * Component to render the header.  The header includes the shredfellows 
 * logo and a link to github for authenticaiton.  State is set to a logged in 
 * status of false.
 */
class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedin: false,
      student: false,
      text: '',
      imgSrc: '',
    }
  }

  componentDidUpdate() {
    console.log("HEADER__STATE___", this.state);
  }

  componentWillMount() {
    let imgSrc;
    let text;
    if (this.state.loggedIn) {
      console.log('IM HERE');
      imgSrc = this.props.user.profileImage;
      text = 'Logout'
    } else {
      imgSrc = ghlogo;
      text = 'Login';
    }
    this.setState({imgSrc});
    this.setState({text});
  }
  componentDidMount() {
    document.body.addEventListener('click', this.handleBurgerClick);
    
    let student = (window.location.search) ? true : false;
    this.setState({student});
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
      {
        utils.renderIf(
          !this.state.student,
          <FontAwesomeIcon id="hamburger" icon={faBars}/>
        )
      }
        <img alt="shred fellows logo" src={sflogo}/>
        <a href={authURL}>
          <img className="gh-logo" alt="github octocat logo" src={this.state.imgSrc} />
          {this.state.text}
        </a>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  assignment: state.assignment,
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps, null)(Header);
