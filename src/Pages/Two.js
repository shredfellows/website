import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Two extends Component {

  render() {
    return (
      <div className="Two">

        <h1>@2</h1>

        <ul>
          <li><Link to='/one'>one</Link></li>
          <li><Link to='/tre'>three</Link></li>
        </ul>
        <ul>
          <li><Link to='/'>home</Link></li>
        </ul>

      </div>
    );
  }
}

export default Two;