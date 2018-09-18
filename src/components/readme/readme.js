import './readme.css';
import React from 'react';
import superagent from 'superagent';
import ReactMarkdown from 'react-markdown';
import cookies from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

/** 
 * Component to fetch the Readme for the assignments and render it onto the page. 
 * State is initalized to blank content.
 */

export default class Readme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      noteBoxOpen: false,
    };
  }

  /**
 * Go to github and fetch the Readme.
 * @param: github token (GHT)
 */
  async componentWillMount() {
    let cookie = cookies.load('GHT'); 
    let url = this.props.readmeDoc;
    if (url && url.length) {
      let data = await superagent.get(url)
        .set('Authorization', `Bearer ${cookie}`);
      let content = atob(data.body.content);
      this.setState({ content });
    } 
  }
    handleNoteIconClick = e => {
      e.preventDefault();
      let boxOpen = this.state.noteBoxOpen;
      let noteBox = document.getElementById('notes');
      if (!boxOpen) {
        noteBox.classList.add('notes-open-from-left');
        this.setState({noteBoxOpen: true});
      } else if (boxOpen) {
        noteBox.classList.remove('notes-open-from-left');
        this.setState({ noteBoxOpen: false });
      }
    }
  /**
 * Render the Readme to the page.
 */
    render() {
      return (
        <React.Fragment>
          <div id="readme">
            <FontAwesomeIcon id="edit-note" icon={faEdit} onClick={this.handleNoteIconClick}/>
            <div className="readme">
              <ReactMarkdown source={this.state.content} />              
            </div>
          </div>
        </React.Fragment>
      );
    }
}