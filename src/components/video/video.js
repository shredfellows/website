import React, { Component } from 'react';
import './video.css';

export default class Video extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="tutorial">
                <iframe src={this.props.videoUrl}></iframe>
            </div>
        )
}};