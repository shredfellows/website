import React from 'react';
import './video.css';


/**  Component to render the video.
 * @module Video
 */
export default class Video extends React.Component {
 
    render() {
        return (
            <div id="tutorial">
                <iframe title="tutorial" src={this.props.videoUrl}></iframe>
            </div>
        )
}};