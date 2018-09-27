import './header.css';

import React from 'react';
import {connect} from 'react-redux';
import cookies from 'react-cookies';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-p-logo-01-01.png';

import * as utils from '../../lib/utils.js';

/** 
 * Component to render the header.  The header includes the shredfellows 
 * logo and a link to github for authenticaiton.  State is set to a logged in 
 * status of false.
 */
class Header extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      student: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBurgerClick);
    
    let student = (window.location.search) ? true : false;
    this.setState({student});
  }

  handleBurgerClick = e => {
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

  logout = () => {
    cookies.remove('Token', { domain: '.shredfellows.ccs.net' });
    cookies.remove('GHT', { domain: '.shredfellows.ccs.net' });
    window.location = '';
  }

  render() {

    return (
      <header className="header">
        {
          utils.renderIf(
            !this.state.student && this.props.loggedIn,
            <FontAwesomeIcon id="hamburger" icon={faBars}/>
          )
        }
        <img alt="shred fellows logo" src={sflogo}/>
        {
          utils.renderIf(
            this.props.loggedIn, 
            <a onClick={this.logout}>
              <img className="gh-logo gh-profile-logo" alt="github profile logo" src={this.props.user.profileImage}/>
              {'Logout'}
            </a>,
            <a href=''>
              <img className="gh-logo" alt="github octocat logo" src={ghlogo} />
              {'Login'}
            </a>
          )
        }
        
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
