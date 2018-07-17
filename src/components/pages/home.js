import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';

import * as api from '../../lib/api.js';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topics:{},
      assignment:{}
    }
    this.getAssignment = this.getAssignment.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }
  async componentWillMount(){
    let payload = {
      model: 'github'
    }
    let topics = await api.get(payload);
   
    this.setState({topics});
  }

  async getAssignment(topic, ass){
    let payload = {
      model: `github/${topic}.${ass}`
    }
    let assignment = await api.get(payload);
    this.setState({assignment});
  }

  render() {
    let topics = this.state.topics || {};
    return (
      <React.Fragment>
      <div className="Home">


        <Sidebar topics={topics} getAssign={this.getAssignment}/>

        <Workspace assignment={this.state.assignment}/>

        
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