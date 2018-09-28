import React from 'react';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './landing.css';

import * as permissionActions from '../../store/actions/permissions.js';

import sflogo from '../../assets/img/shred-logo-landing.png';

import { authURL } from '../../lib/githubLogin.js';

import Form from '../form/form.js';



class Landing extends React.Component {

  componentWillMount() {
    let token = cookies.load('Token');

    if (token) {
      this.props.loggedInStatus(true);
    }
  }
  
  handleSubmit = formData => { // eslint-disable-line
    alert('Basic Authentication is a TODO and not functional just yet. Try signing in with GitHub.');
  }

  alertResponse = response => {
    alert(response);
  }

  render() {
    
    if (this.props.loggedIn) {
      return <Redirect to='/dashboard' />;
    }

    return(
      <section className="landing-overlay">
        <div className="login-container">
          <img alt="shred fellows logo" src={sflogo} />
          <a href={authURL}>
            <FontAwesomeIcon icon={faGithub}/>
            <p>Login with GitHub</p>
          </a>
          <p>or</p>
          <Form handler={this.handleSubmit}/>
        </div>
        <footer>
          <a href="" onClick={() => this.alertResponse('This Feature is underway.')}>Forgot Password?</a>
          <a href="" onClick={() => this.alertResponse('This Feature is underway.')}>Sign Up</a>
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