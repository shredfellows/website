import React from 'react';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Form from '../form/form.js';

import { authURL } from '../../lib/githubLogin.js';
import * as permissionActions from '../../store/actions/permissions.js';

import sflogo from '../../assets/img/shred-logo-landing_fff.png';

import './landing.css';


class Landing extends React.Component {

  state = {
    offsetX: 0,
    offsetY: 0,

    signup: false,
  }
  
  // componentDidUpdate() {
  //   console.log('__STATE__', this.state);
  // }

  componentWillMount() {
    let token = cookies.load('Token');

    if (token) {
      this.props.loggedInStatus(true);
    }
  }
  
  signup = () => {
    this.setState({signup: !this.state.signup});
  }

  handleSubmit = formData => { // eslint-disable-line
    alert('Basic Authentication is a TODO and not functional just yet. Try signing in with GitHub.');
  }

  alertResponse = response => {
    alert(response);
  }

  handleMouseMove = e => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let screenWidth = screen.width;
    let screenHeight = screen.height;

    let offsetX = (mouseX - (screenWidth / 2)) / -100;
    let offsetY = (mouseY - (screenHeight / 2)) / -100;

    this.setState({offsetX: offsetX, offsetY: offsetY});
  }

  render() {
    
    if (this.props.loggedIn) {
      return <Redirect to='/dashboard' />;
    }

    const silhouette3DStyle = {
      transform: `translate3d(${this.state.offsetX}px, ${this.state.offsetY}px, 0)`,
    };

    return(
      <section onMouseMove={this.handleMouseMove} className="landing-overlay">
        <div className="silhouette-back"></div>
        <div style={silhouette3DStyle} className="silhouette-front"></div>
        <div className="login-container">
          <img alt="shred fellows logo" src={sflogo} />
          <a href={authURL}>
            <FontAwesomeIcon icon={faGithub}/>
            <p>{this.state.signup ? 'Sign Up with Github' : 'Login with Github'}</p>
          </a>
          <p>or</p>
          <Form signup={this.state.signup} handler={this.handleSubmit}/>
        </div>
        <footer>
          <a href="" onClick={() => this.alertResponse('This Feature is underway.')}>Forgot Password?</a>
          <a onClick={this.signup}>{this.state.signup ? 'Login' : 'Sign Up' }</a>
        </footer>
      </section>
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
  assignment: state.assignment,
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  loggedInStatus: payload => dispatch(permissionActions.loggedInStatus(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
