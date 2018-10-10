import React from 'react';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Form from '../form/form.js';

import { authURL } from '../../lib/githubLogin.js';
import * as permissionActions from '../../store/actions/permissions.js';

/* IMAGES */
import sflogo from '../../assets/img/shred-logo-landing_fff.png';
import silhouetteFront from '../../assets/img/seattle-silhouette-front-black-long.png';
import silhouetteBack from '../../assets/img/seattle-silhouette-back-red.png';

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

    let offsetX = mouseX - (screenWidth / 2);
    let offsetY = (mouseY - (screenHeight / 2)) / -200;

    this.setState({offsetX: offsetX, offsetY: offsetY});
  }

  render() {
    
    if (this.props.loggedIn) {
      return <Redirect to='/dashboard' />;
    }
    
    /* Next block determines speed and depth of 3D effect for
    *  Front Silhouette and Back Silhouette   
    */

    let frontLeftPosition = (this.state.offsetX / -200);
    let backLeftPosition = (this.state.offsetX / 300);
    let bottomPosition = this.state.offsetY > 0 ? this.state.offsetY : 0;

    const silhouette3DStyle = {
      front: {
        transform: `translate3d(${frontLeftPosition - 64}px, ${bottomPosition}px, 0)`,
      },
      back: {
        transform: `translate3d(${backLeftPosition}px, ${bottomPosition}px, 0)`,
      },
    };

    return(
      <section onMouseMove={this.handleMouseMove} className="landing-overlay">
        <div className="silhouette-back">
          <img style={silhouette3DStyle.back} src={silhouetteBack} />
        </div>
        <div className="silhouette-front">
          <img style={silhouette3DStyle.front} src={silhouetteFront} />
        </div>
        <div className="login-container">
          <img alt="shred fellows logo" src={sflogo} />
          <a href={authURL}>
            <FontAwesomeIcon icon={faGithub}/>
            <p>{this.state.signup ? 'Sign Up with Github' : 'Login with Github'}</p>
          </a>
          <p>or</p>
          <Form signup={this.state.signup} handler={this.handleSubmit}/>
          <footer>
            <a href="" onClick={() => this.alertResponse('This Feature is underway.')}>Forgot Password?</a>
            <a onClick={this.signup}>{this.state.signup ? 'Login' : 'Sign Up'}</a>
          </footer>
        </div>
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
