import React from 'react';
import './output.css';

export default class Output extends React.Component {
    render() {
        return (
            <div id="output">
                <pre>{this.props.output}</pre>
            </div>
        )
}};