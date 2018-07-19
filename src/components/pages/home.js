import React, { Component } from 'react';
import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';
import * as api from '../../lib/api.js';
import { RingLoader } from 'react-spinners';
import './home.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topics:{},
      assignment:{}
    }
    this.getAssignment = this.getAssignment.bind(this);
  }

  async componentWillMount(){
    let payload = {
      model: 'github'
    }
    let topics = await api.get(payload);
    this.setState({topics});
    this.props.loading(false);
  }

  async getAssignment(topic, ass){
    this.props.loading(true);
    let payload = {
      model: `github/${topic}.${ass}`
    }
    let assignment = await api.get(payload);
    this.setState({assignment});
    this.props.loading(false);
  }

  

  render() {
    let topics = this.state.topics || {};
    if(this.props.loadingStatus===true){
      return (
        <div className='sweet-loading'>
          <RingLoader className="spinner" size={160} color={'#ff0000'} />
        </div>
      )};

    return (

      <React.Fragment>
      <div className="Home">
        <Sidebar loading={this.props.loading} topics={topics} getAssign={this.getAssignment}/>
        <Workspace assignment={this.state.assignment}/>
      </div>
      </React.Fragment>

    );

}
}

export default Home;