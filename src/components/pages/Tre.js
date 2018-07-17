import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Tre extends Component {

  render() {
    return (
      <div className="Tre">

        <h1>@3</h1>

          <ul>
            <li><Link to='/one'>one</Link></li>
            <li><Link to='/two'>two</Link></li>
          </ul>
          <ul>
          <li><Link to='/'>home</Link></li>
        </ul>

      </div>
    );
  }
}

export default Tre;