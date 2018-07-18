import React from 'react';
import './workspace.css';

import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';
import Rotator from '../rotator/rotator.js'
import * as api from '../../lib/api.js';
import { renderIf } from '../../lib/utils';

export default class Workspace extends React.Component {
    constructor(props) {
        super(props);
        this.state={output:''}
        this.runCode=this.runCode.bind(this);
    }

    async runCode(input){
        let payload={
            endpoint:'code',
            body:input
        }
        let solution = await api.post(payload);
        console.log({solution});
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
            console.log({traceback})
            errors += traceback;
        }
        let output = consoleLogs + '\r' + errors + '\r< ' + solution['return'];
        this.setState({output});
    }

    render() {
        let challenges = [];
        try{
            challenges = Object.values(this.props.assignment.challenges);
        }
        catch(e){};

        return (
            <div className="workspace">
            
                <Video videoUrl={this.props.assignment.video}/>
                {renderIf(this.props.assignment && this.props.assignment.challenges, 
                    <Rotator>
                        {challenges.map((challenge, i) =>
                           <Repl key={i} challenges={challenge} runCode={this.runCode} />
                     )}
                    </Rotator>
                )}
                <Readme readmeDoc={this.props.assignment.readme}/>
                <Output output={this.state.output} />
            
            </div>
        )
}};