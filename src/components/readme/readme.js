import './readme.css';
import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown';
import cookies from 'react-cookies'

import Notes from '../notes/notes.js';

export default class Readme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''}
    }

    //Changed from componentWillUpdate after spinner was setup
    async componentWillMount(prevProps, prevState) {
        let cookie = cookies.load('GHT'); 
        let url = this.props.readmeDoc;
        if (url && url.length) {
            let data = await superagent.get(url)
                .set('Authorization', `Bearer ${cookie}`);
            let content = atob(data.body.content);
            this.setState({ content });
        } 
    }

    render() {
        return (
            <React.Fragment>
            <div className="readme">
                <ReactMarkdown source={this.state.content} />              
            </div>
            <div className="notes">
                <Notes/>
            </div>
            </React.Fragment>
        )
    }
};