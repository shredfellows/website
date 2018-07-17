import React from 'react';
import './workspace.css';

import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';

export default class Workspace extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="workspace">
            
                <Video videoUrl={this.props.assignment.video}/>
                <Repl challenges={this.props.assignment.challenges}/>
                <Readme readmeDoc={this.props.assignment.readme}/>
                <Output />
            
            </div>
        )
}};