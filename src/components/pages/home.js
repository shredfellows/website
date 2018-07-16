import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Workspace from '../workspace/workspace.js';

class Home extends Component {

  render() {
    return (
      <div className="Home">

        <h1>@HOME</h1>

        <Workspace />

        
        {/* <ul>
          <li><Link to='/one'>one</Link></li>
          <li><Link to='/two'>two</Link></li>
          <li><Link to='/tre'>three</Link></li>
        </ul> */}

      </div>
    );
  }
}

export default Home;