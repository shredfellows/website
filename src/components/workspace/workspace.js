import React from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import cookies from 'react-cookies';
import copy from 'copy-to-clipboard';

import './workspace.css';

// Components
import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';
import Rotator from '../rotator/rotator.js';
import Notes from '../notes/notes.js';

import * as api from '../../lib/api.js';
import { renderIf } from '../../lib/utils';

// Dispatchers
import * as codeActions from '../../store/actions/code.js';


/** 
 * Component to run code in the coderunner to check for errors.  Renders it to the 
 * page.
 */

export class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      urlToCopy: '',
      student: false,
    };
        
    this.runCode = this.runCode.bind(this);
    this.generateLink = this.generateLink.bind(this);
  }
  // componentDidUpdate() {
  //   console.log('__WORKSPACE__', this.state.output);
  // }
  componentDidMount() {
    let student = (window.location.search) ? true : false;
    this.setState({ student });
  }

  async runCode(input){
        
    let payload = {
      endpoint:'code',
      body:input,
    };

    let solution = await api.post(payload);

    let consoleLogs = '';
    let errors = '';

    if (solution['console.log']) {
      for (let i = 0; i < solution['console.log'].length; i++) {
        consoleLogs = consoleLogs + solution['console.log'][i] + `\r`;
      }
    }

    if (solution['error']) {
      errors += solution['error']['ename'] + ': ' + solution['error']['evalue'] + `\r`;
      let traceback = '\nat ' + solution['error']['traceback'][0] + '\n';
      for (let i = 1; i < solution['error']['traceback'].length; i++) {
        traceback = traceback + solution['error']['traceback'][i] + '\n';
      }
      errors += traceback;
    }
    
    let output = consoleLogs + '\r' + errors + '\r< ' + solution['return'];

    // add to redux store
    this.props.addOutput({output});
  }

  generateLink(){
    let topic = this.props.storeAssignment.assignmentName.split('/')[0];
    let assign = this.props.storeAssignment.assignmentName.split('/')[1];
    let user = cookies.load('Token');
    let secret = 'johnisbald'; 
    let token = jwt.sign({topic: topic, assignment: assign, user: user}, secret);
    let urlToCopy = `http://shredfellows.ccs.net/?submission=${token}`;
    this.setState({urlToCopy});
  }

    copyLink = e => {
      e.preventDefault();
      let urlToCopy = this.state.urlToCopy;
      return copy(urlToCopy);
    }

    render() {
      let challenges = [];
      let challengesKeys = [];
      
      try {
        challenges = Object.values(this.props.assignment.challenges);
        challengesKeys = Object.keys(this.props.assignment.challenges);
      }
      catch(e){
        console.log(e);
      }

      return (
        <div className="workspace">
          <div id="workspace-overlay"></div>
          <div className="content video"> 
            <Video videoUrl={this.props.assignment.video}/>
          </div>
          {renderIf(this.props.assignment && this.props.assignment.challenges, 
            <div className="content"> 
              <Rotator>
                {challenges.map((challenge, i) =>
                  <Repl 
                    key={challengesKeys[i]} 
                    id={`${this.props.singleTopic}/${this.props.assignment.name}/${challengesKeys[i]}`} 
                    challengeLinks={challenge} 
                    runCode={this.runCode}
                  />
                )}
              </Rotator>
            </div>
          )}
          <div className="content readme">

            <Readme readmeDoc={this.props.assignment.readme}/>
          </div>
          <Notes />
          <div className="content output">
            <Output output={this.props.output} />
          </div>
          {renderIf(this.state.urlToCopy.length,
            <form id="submission-url">
              {'Here\'s your submission url:'}<br />
              <input type="text" value={this.state.urlToCopy}></input>
              <button onClick={e => this.copyLink(e)}>Copy</button>
            </form>
          )}
          {
            renderIf((this.state.student && !this.state.urlToCopy.length),
              <button onClick={()=>this.generateLink()}>Copy Submission Link</button>
            )
          }
        </div>
      );
    }}

const mapStateToProps = state => ({
  challenges: state.challenges,
  output: state.challenges.output,
  users: state.user,
  storeAssignment: state.assignment,
});

const mapDispatchToProps = dispatch => ({
  addOutput: payload => dispatch(codeActions.addOutput(payload)),
});
  

  
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);