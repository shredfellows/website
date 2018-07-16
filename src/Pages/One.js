import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class One extends Component {

  render() {
    return (
      <div className="One">

        <h1>@1</h1>

        <ul>
          <li><Link to='/two'>two</Link></li>
          <li><Link to='/tre'>three</Link></li>
        </ul>
        <ul>
          <li><Link to='/'>home</Link></li>
        </ul>

      </div>
    );
  }
}

export default One;