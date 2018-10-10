import React from 'react';

import './form.css';

// FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {faUserNinja} from '@fortawesome/free-solid-svg-icons';
 
export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email:'',
      password: '',
      confirmPassword: '',
    };
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if ( this.state.email === nextState.email && this.props.signup === nextProps.signup) { return false; }
    return true;
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handler(this.state);
  }

  render() {
    let signup = this.props.signup;

    return(
      <form className="login-form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
        {
          signup ? 
            <div>
              <FontAwesomeIcon icon={faUserNinja} />
              <input name="username" type="text" placeholder="username" />
            </div>
            : null
        }
        <div>
          <FontAwesomeIcon icon={faEnvelope}/>
          <input name="email" type="text" placeholder="email"/>
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input name="password" type="password" placeholder="password"/>
        </div>
        {
          signup ? 
            <div>
              <FontAwesomeIcon icon={faLock} />
              <input name="confirmPassword" type="password" placeholder="confirm" />
            </div>
            : null
        }
        <input type="submit"/>
      </form>
    );
  }
}