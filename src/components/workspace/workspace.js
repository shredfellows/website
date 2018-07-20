import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';

import './workspace.css';

import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';
import Rotator from '../rotator/rotator.js'
import Notes from '../notes/notes.js';

import * as api from '../../lib/api.js';
import { renderIf } from '../../lib/utils';
// import * as actions from '../../store/actions/code.js'

export class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state={output:''}
        this.runCode=this.runCode.bind(this);
        this.submitAssignment=this.submitAssignment.bind(this);
    }

    async runCode(input){
        
        let payload={
            endpoint:'code',
            body:input
        }

        let solution = await api.post(payload);

        let consoleLogs = '';
        let errors = '';

        if (solution['console.log']) {
            for (let i = 0; i < solution['console.log'].length; i++) {
                consoleLogs = consoleLogs + solution['console.log'][i] + `\r`;
            }
        }
        if (solution['error']) {
            errors += solution['error']['ename'] + ': '+ solution['error']['evalue'] + `\r`;
            let traceback = '\nat ' + solution['error']['traceback'][0] + '\n'
            for (let i = 1; i < solution['error']['traceback'].length; i++) {
                traceback = traceback + solution['error']['traceback'][i] + '\n';
            }
            
            errors += traceback;
        }
        let output = consoleLogs + '\r' + errors + '\r< ' + solution['return'];
        this.setState({output});
    }

    submitAssignment(user,data){
        console.log(user,data);
    }

    render() {
        let challenges = [];
        let challengesKeys = [];
        try {
            challenges = Object.values(this.props.assignment.challenges);
            challengesKeys = Object.keys(this.props.assignment.challenges);
        }
        catch(e){
            console.log(e)
        };

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
                            <Repl key={uuid()} id={`${this.props.singleTopic}/${this.props.assignment.name}/${challengesKeys[i]}`} challengeLinks={challenge} runCode={this.runCode} />
                        )}
                    </Rotator>
                </div>
                )}
                <div className="content readme">
                    <Readme readmeDoc={this.props.assignment.readme}/>
                </div>
                <Notes />
                <div className="content output">
                    <Output output={this.state.output} />
                </div>
                <button onClick={()=>this.submitAssignment(this.props.users,this.props.challenges)}>Submit Assignment</button>
            </div>
        )
}};

const mapStateToProps = state => ({
    challenges: state.challenges,
    users: state.user,
  });
  
//   const mapDispatchToprops = (dispatch, getState) => ({
//     saveAssignment: payload => dispatch(actions.saveAssignment(payload)),
//   });
  
  export default connect(mapStateToProps, null)(Workspace);