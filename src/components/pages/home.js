import React, { Component } from 'react';
import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';
import * as api from '../../lib/api.js';
import { RingLoader } from 'react-spinners';
import './home.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users.js';
import cookies from 'react-cookies';

export class Home extends Component {

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

    let token = cookies.load('Token'); 
    if(token){
      
      let profile = await api.login(token);
      console.log({profile});
      this.props.addUser(profile);
    }
  }

  

  async getAssignment(topic, ass){

    //We need to consider what to use as a unique identifier for the assignment. Should we store the whole this.state.assignment in the profile mongo model?
    if(!this.props.user.assignment.includes(`${topic}/${ass}`)){
      this.props.loading(true);
      let gitPayload = {
        model: `github/${topic}.${ass}`
      }
      let assignment = await api.get(gitPayload);
      this.setState({assignment});
      this.props.loading(false);
  }
    
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToprops = (dispatch, getState) => ({
  addUser: payload => dispatch(actions.addUser(payload)),
});

export default connect(null, mapDispatchToprops)(Home);