import React from 'react';

import './form.css';

// FONT AWESOME ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password: '',
    };
  }
  
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.hanlder(this.state);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div>
          <FontAwesomeIcon icon={faEnvelope}/>
          <input name="email" type="text" placeholder="email"/>
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} />
          <input name="password" type="password" placeholder="password"/>
        </div>
        <input type="submit"/>
      </form>
    );
  }
}