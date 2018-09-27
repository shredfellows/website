import React from 'react';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './landing.css';

import sflogo from '../../assets/img/shred-logo-landing.png';

import { authURL } from '../../lib/githubLogin.js';

import Form from '../form/form.js';

export default class Landing extends React.Component {
  
  handleSubmit = formData => { // eslint-disable-line
    alert('Basic Authentication is a TODO and not functional just yet. Try signing in with GitHub.');
  }

  alertResponse = response => {
    alert(response);
  }

  render() {

    let token = cookies.load('Token');
    
    if (token) {
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