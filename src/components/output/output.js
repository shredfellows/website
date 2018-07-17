import React from 'react';
import './output.css';

export default class Output extends React.Component {
    render() {
        return (
            <pre className="readme">{this.props.output}</pre>
        )
}};