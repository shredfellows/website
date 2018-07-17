import './readme.css';

import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown'

export default class Readme extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        let url = this.props.readmeDoc;
        if (url && url.length) {
            let data = await superagent.get(url);
            let content = atob(data.body.content);
            this.setState({ content });
        } 
    }

    render() {
        return (
            <div className="readme">
                <ReactMarkdown source={this.state.content} />
            </div>
        )
}};