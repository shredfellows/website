import React from 'react';
import './workspace.css';

import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';
import * as api from '../../lib/api.js';

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
        console.log(solution);
        let consoleLogs = '';
        if (solution['console.log']) {
            for (let i = 0; i < solution['console.log'].length; i++) {
                consoleLogs = consoleLogs + solution['console.log'][i] + `\r`;
            }
        }
        let output = consoleLogs + `\r` + '< ' + solution['return'];
        console.log({output});
        this.setState({output});
    }

    componentDidUpdate(){
        console.log('__WORKSTATE__',this.state.output)
    }

    render() {
        return (
            <div className="workspace">
            
                <Video videoUrl={this.props.assignment.video}/>
                <Repl challenges={this.props.assignment.challenges} runCode={this.runCode}/>
                <Readme readmeDoc={this.props.assignment.readme}/>
                <Output output={this.state.output} />
            
            </div>
        )
}};