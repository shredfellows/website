import React from 'react';
import './readme.css';

export default class Readme extends React.Component {
    render() {
        return (
            <div className="readme">
                <iframe sandbox="allow-scripts" src={this.props.readmeDoc}></iframe>
            </div>
        )
}};