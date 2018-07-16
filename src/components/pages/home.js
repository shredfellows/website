import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';

import * as api from '../../lib/api.js';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topics:{}
    }
  }

  async componentWillMount(){
    let payload = {
      model: 'github'
    }
    let topics = await api.get(payload);
    this.setState({topics});
  }

  render() {
    return (
      <React.Fragment>
       
      <div className="Home">


        <Sidebar topics={this.state.topics}/>

        <Workspace />

        
        {/* <ul>
          <li><Link to='/one'>one</Link></li>
          <li><Link to='/two'>two</Link></li>
          <li><Link to='/tre'>three</Link></li>
        </ul> */}

      </div>

      </React.Fragment>

    );
  }
}

export default Home;