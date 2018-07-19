import './readme.css';
import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown';
import cookies from 'react-cookies'

/** Component to fetch the Readme for the assignments and render it onto the page. 
 *  Content is inatlized to blank.
 * @module Readme
 */
export default class Readme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''}
    }

/**
 *  Go to github and fetch the Readme.
 * @param: github token (GHT)
 */
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
/**
 * Render the Readme to the page.
 */
    render() {
        return (
            <div className="readme">
                <ReactMarkdown source={this.state.content} />
              
            </div>
        )
    }
};