import React from 'react';
import './workspace.css';

import Video from '../video/video.js';
import Repl from '../repl/repl.js';
import Readme from '../readme/readme.js';
import Output from '../output/output.js';

export default class Workspace extends React.Component {
    render() {
        return (
            <div className="workspace">
            
                <Video />
                <Repl />
                <Readme />
                <Output />
            
            </div>
        )
}};