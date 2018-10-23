import './repl.css';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import superagent from 'superagent';
import cookies from 'react-cookies';
import { connect } from 'react-redux';

// Components
import ReplModal from '../replModal/replModal.js';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand} from '@fortawesome/free-solid-svg-icons';

import * as api from '../../lib/api.js';
import * as codeActions from '../../store/actions/code.js';
import * as userActions from '../../store/actions/users.js';

/** 
 * Component to render the repl and submit the user's code to the database.
 */
class Repl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      code: this.props.challenges[this.props.id],
      replExpanded: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    console.log('REPL__STATE__', this.state);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.runCode(this.state.code);
    let payload = {};
    payload[this.props.id] = this.state.code;
    this.props.submitCode(payload);
  }

  editorDidMount(editor) {
    editor.focus();
    editor.layout();
  }

  onChange(newValue) {
    this.setState({code:newValue});
    let payload = {};
    payload[this.props.id] = this.state.code;
    this.props.submitCode(payload);
  }
  /**
 * Save the code to the database.
 */
    saveCodeToDB = async () => {
      let body = {};
      let regex = new RegExp(this.props.assignment.assignmentName, 'gi');

      Object.keys(this.props.challenges)
        .filter(challenge => challenge.match(regex))
        .forEach(challengeKey => {
          body[challengeKey] = this.props.challenges[challengeKey];
        });

      let challengeName = this.props.id.split('/')[2];
      let endpoint = `code/${this.props.assignment._id}/${challengeName}`;
    
      let codeData = {endpoint, body};
      let data  = await api.put(codeData);
        
      let payload = {
        assignmentName: this.props.assignment.assignmentName,
        code: data.input,
      };
    
      this.props.addCodeToUser(payload);


    }
  /**
 * Fetch the code challenges from github using cookies.
 * @param - Github token (GHT)
 */
    async componentWillMount() {
        
      let url = this.props.challengeLinks;
      let cookie = cookies.load('GHT');
      let code;

      let codeExists = this.challengeCodeExists();

      if (url && url.length && !this.props.challenges[this.props.id] && !codeExists && !codeExists.length) {
            
        let data = await superagent.get(url)
          .set('Authorization', `Bearer ${cookie}`);
            
        let content = atob(data.body.content);
        code = content;
    
        this.setState({code});

        let payload = {};
        payload[this.props.id] = this.state.code;
        this.props.submitCode(payload);

        this.saveCodeToDB();

      } else if (codeExists && codeExists.length) {
        this.setState({code: codeExists});

        let payload = {};
        payload[this.props.id] = codeExists;
        this.props.submitCode(payload);
      }
    }

    challengeCodeExists = () => {

      let assignmentName = this.props.id.split('/').splice(0,2).join('/');
      let challengeName = this.props.id;
      let codeExists = this.props.user.assignments.filter(singleAssgn => {
        return (singleAssgn.assignmentName === assignmentName) &&  (singleAssgn.code && singleAssgn.code[challengeName]);
      });

      return codeExists.length ? codeExists[0].code[challengeName] : false;
    }

    saveCode = async e => {
      e.preventDefault();
      this.saveCodeToDB();
    }

    expandRepl = e => {
      e.preventDefault();
      this.setState({replExpanded: !this.state.replExpanded});
    }
  
    /**
  * Render the code box onto the page.  Monaco is the editor used.
  */
    render() {
      const code = this.state.code;
      const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
      };

      return (
        <React.Fragment>
          <div className="repl" >
            <form>
              <MonacoEditor
                language="javascript"
                theme=""
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
              />
              <button className="submit-button" onClick={this.saveCode}>Save Code</button>
              <button className="submit-button" id="runCode" onClick={this.handleSubmit}>Run Code</button>    
              <button className="expand" onClick={this.expandRepl}>
                <FontAwesomeIcon icon={faExpand} />
              </button>                
            </form>
          </div>
          {
            this.state.replExpanded ? 
              <ReplModal 
                code={code} 
                options={options} 
                onChange={this.onChange} 
                editorDidMount={this.editorDidMount}
                saveCode={this.saveCode}
                handleSubmit={this.handleSubmit}
              /> :
              null
          }
        </React.Fragment>
      );
    }}


const mapStateToProps = state => ({
  challenges: state.challenges,
  user: state.user,
  assignment: state.assignment,
});
  
const mapDispatchToprops = dispatch => ({
  submitCode: payload => dispatch(codeActions.addCode(payload)),
  addCodeToUser: payload => dispatch(userActions.addCodeToUser(payload)),

});
  
export default connect(mapStateToProps, mapDispatchToprops)(Repl);