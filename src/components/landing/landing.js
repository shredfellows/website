import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './landing.css';

import sflogo from '../../assets/img/shred-logo-landing.png';

import Form from '../form/form.js';

export default class Landing extends React.Component {
  render() {
    return(
      <section className="landing-overlay">
        <div className="login-container">
          <img alt="shred fellows logo" src={sflogo} />
          <a href="#">
            <FontAwesomeIcon icon={faGithub}/>
            <p>Login with GitHub</p>
          </a>
          <p>or</p>
          <Form />
        </div>
      </section>
    );
  }
}