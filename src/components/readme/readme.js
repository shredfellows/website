import './readme.css';

import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown';

export default class Readme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {content: ''}
    }

    //Changed from componentWillUpdate after spinner was setup
    async componentWillMount(prevProps, prevState) {
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
    }
};