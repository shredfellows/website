import React from 'react';
import './workspace.css';
import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';
import Rotator from '../rotator/rotator.js'
import * as api from '../../lib/api.js';
import { renderIf } from '../../lib/utils';
import uuid from 'uuid';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import cookies from 'react-cookies';
import copy from 'copy-to-clipboard';
// import * as actions from '../../store/actions/code.js'


export class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state={output:'', urlToCopy: ''}
        this.runCode=this.runCode.bind(this);
        this.generateLink=this.generateLink.bind(this);
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

    generateLink(){
        let topic = this.props.users.assignments[0].assignmentName.split('/')[0];
        let assign = this.props.users.assignments[0].assignmentName.split('/')[1];
        let user = cookies.load('Token');
        let secret = 'johnisbald'; 
        let token = jwt.sign({topic: topic, assignment: assign, user: user}, secret);
        let urlToCopy = `http://shredfellows.ccs.net/?submission=${token}`
        this.setState({urlToCopy});
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
            console.log(e)
        };

        return (
            <div className="workspace">
                <div className="row"> 
                    <Video videoUrl={this.props.assignment.video}/>
                    {renderIf(this.props.assignment && this.props.assignment.challenges, 
                    <Rotator>
                        {challenges.map((challenge, i) =>
                            <Repl key={uuid()} id={`${this.props.singleTopic}/${this.props.assignment.name}/${challengesKeys[i]}`} challengeLinks={challenge} runCode={this.runCode} />
                        )}
                    </Rotator>
                    )}
                </div>
                <div className="row">
                    <Readme readmeDoc={this.props.assignment.readme}/>
                    <Output output={this.state.output} />
                </div>
                {renderIf(this.state.urlToCopy.length, 
                    <span>Here's your submission url: <br />{this.state.urlToCopy}</span>
                )}
                <button onClick={()=>this.generateLink()}>Copy Submission Link</button>
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