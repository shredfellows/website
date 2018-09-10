import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { connect } from 'react-redux';
import cookies from 'react-cookies';
import jwt from 'jsonwebtoken';
import Workspace from '../workspace/workspace.js';
import Sidebar from '../sidebar/sidebar.js';

import * as api from '../../lib/api.js';
import * as actions from '../../store/actions/users.js';
import * as assignmentActions from '../../store/actions/assignment.js';
import * as permissionActions from '../../store/actions/permissions.js';

import './home.css';

/**
 * Component to fetch the assignments and build the home page.  State is set to 
 * empty objects for both topics and assignments.
 */

export class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topics:{},
      assignment:{},
      singleTopic: {},
      view:{},
    };
    this.getAssignment = this.getAssignment.bind(this);
    this.assignmentExists = this.assignmentExists.bind(this);
    this.saveAssignment = this.saveAssignment.bind(this);
  }

  /**Get the list of topics from github
 * @param: github token
 */
  async componentWillMount() {
    console.log(this.props);
    
    let query = window.location.search;
    let view = query.replace(/\?|\=/g,' ').split(' ')[1];
    if(view==='submission'){
      this.setState({view:'submission'});
      let unparsedToken = query.replace(/\?|\=/g,' ').split(' ')[2];
     
      let parsedToken = jwt.verify(unparsedToken, 'johnisbald');
      let {topic, assignment, user} = parsedToken;
      let token = cookies.load('Token'); 
      if(token){
        cookies.remove('Token');
      }
      cookies.save('Token',user);
    }

    
    let payload = {
      model: 'github',
    };

    let topics = await api.get(payload);
    this.setState({topics});
    this.props.loading(false);

    let token = cookies.load('Token'); 
    console.log('TOKEN FROM LINE 48 of HOME', token);
    if (token) {
      console.log('setting state!');
      
      this.props.loggedInStatus(true);
      let profile = await api.login(token);
      this.props.addUser(profile);
    }
    if(this.state.view==='submission'){
      let unparsedToken = query.replace(/\?|\=/g,' ').split(' ')[2];
      
      let parsedToken = jwt.verify(unparsedToken, 'johnisbald');
      let {topic, assignment, user} = parsedToken;
      this.getAssignment(topic, assignment);
    }

    if(view==='assignment'){
      let token = cookies.load('Token');
      if(token){
        this.setState({view:'assignment'});
        let topicAndAssignment = query.replace(/\?|\=/g,' ').split(' ')[2];
        let topic = topicAndAssignment.split('.')[0];
        let assignment = topicAndAssignment.split('.')[1];
        this.getAssignment(topic, assignment);
      }
    }
  }

  /**Get the list of assignments for each topic from github.  Creates a new 
 * assignment if one does not already exist.
 * @param: github token
 */

  async getAssignment(topic, assgn){
    console.log('PARAMATERS', topic, assgn);
    this.props.loading(true);
      
    let gitPayload = {
      model: `github/${topic}.${assgn}`,
    };
    
    let assignment = await api.get(gitPayload);

    this.setState({singleTopic: topic});
    this.setState({assignment});
    console.log('ASSIGNEMTN IN HOME', this.state.assignment);
    let assgnExists = this.assignmentExists();

    if (assgnExists) {
      this.props.setCurrentAssignment(assgnExists);
    } else {
      let newAssignment = await this.saveAssignment();
      this.props.addAssignment(newAssignment);
      this.props.setCurrentAssignment(newAssignment);
    }

    this.props.loading(false);
    
  }

  /** Save the assignment to the user's profile.
*/
  async saveAssignment() {
    let endpoint = 'assignment';
    let body = {
      assignmentName: `${this.state.singleTopic}/${this.state.assignment.name}`,
      profileId: `${this.props.user._id}`,
    };
    let payload = {endpoint, body};
    let data = await api.post(payload);
    return data;
  }

  assignmentExists() {
    let assgnExists = this.props.user && this.props.user.assignments && this.props.user.assignments.filter(singleAssgn => {
      return singleAssgn.assignmentName === `${this.state.singleTopic}/${this.state.assignment.name}`;
    });
    return assgnExists && assgnExists.length ? assgnExists[0] : false;
  }

  /**
 * Render the page with a spinner until the page loads.
 */
  render() {
    let topics = this.state.topics || {};
    let name = this.props.user && this.props.user.name;
    name = name? name.split(' ')[0]:'';
    if(this.props.loadingStatus===true){
      return (
        <div className='sweet-loading'>
          <RingLoader className="spinner" size={160} color={'#ff0000'} />
        </div>
      );}
    
    if(!this.props.loggedIn){
      return(
        <div>Please register with GitHub</div>
      );
    }
    if(Object.keys(this.props.assignment).length === 0){
      return(
        <React.Fragment>
          <div className="Home">
            <div id="workspace-overlay"></div>
            <Sidebar loading={this.props.loading} topics={topics} getAssign={this.getAssignment}/>
            <div className="welcomeBack">Welcome Back, {name}!</div>
            <img className="userImage" src={this.props.user.profileImage} alt="Profile" />
          </div>
        </React.Fragment>
      );
    }
    else if (this.props.loggedIn){
      return(
        <React.Fragment>
          <div>
            <Sidebar loading={this.props.loading} topics={topics} getAssign={this.getAssignment}/>
            <Workspace singleTopic={this.state.singleTopic} assignment={this.state.assignment}/>
          </div>
        </React.Fragment>
      );
    }

  }
}

const mapStateToProps = state => ({
  user: state.user,
  assignment: state.assignment,
  loggedIn: state.loggedIn,
});

const mapDispatchToprops = (dispatch, getState) => ({
  addUser: payload => dispatch(actions.addUser(payload)),
  addAssignment: payload => dispatch(actions.addAssignment(payload)),
  setCurrentAssignment: payload => dispatch(assignmentActions.setCurrentAssignment(payload)),
  loggedInStatus: payload => dispatch(permissionActions.loggedInStatus(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Home);
