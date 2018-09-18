import React from 'react';
import './output.css';

export default class Output extends React.Component {
  render() {
    return (
      <div id="output" className="outputWrapper">
        <pre className="output">{this.props.output}</pre>
      </div>
    );
  }}