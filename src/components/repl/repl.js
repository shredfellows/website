import './repl.css';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import superagent from 'superagent';
import cookies from 'react-cookies'
import { connect } from 'react-redux';

import * as api from '../../lib/api.js';
import * as codeActions from '../../store/actions/code.js'

export class Repl extends React.Component {
    constructor(props){
        super(props)
        this.state={code:this.props.challenges[this.props.id]}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate() {
        console.log("REPL__STATE__", this.state);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.runCode(this.state.code);
        let payload = {};
        payload[this.props.id]=this.state.code;
        this.props.submitCode(payload);
    }

    editorDidMount(editor, monaco) {
        editor.focus();
    }

    onChange(newValue, e) {
        this.setState({code:newValue});
        let payload = {};
        payload[this.props.id]=this.state.code;
        this.props.submitCode(payload);
    }

    saveCodeToDB = async () => {
        // payload = {endpoint, body} api/v1/code/assignmentid/challengename
        let challengeName = this.props.id.split('/')[2];
        let codeInput = this.props.challenges[this.props.id];
        let endpoint = `code/${this.props.assignment._id}/${challengeName}`;
        let body = {
            [challengeName] : codeInput, 
        };
        let payload = {endpoint, body};
        let data  = await api.put(payload);
        console.log({data});
    }

    async componentWillMount(prevProps, prevState) {
        
        let url = this.props.challengeLinks;
        let cookie = cookies.load('GHT');
        let code;

        let codeExists = this.challengeCodeExists();

        if (url && url.length && !this.props.challenges[this.props.id] && !codeExists && !codeExists.length) {
            
            let data = await superagent.get(url)
                .set('Authorization', `Bearer ${cookie}`);
            
            let content = atob(data.body.content);
            code = '/*' + content + '*/';
    
            this.setState({code});

            let payload = {};
            payload[this.props.id]=this.state.code;
            this.props.submitCode(payload);

            this.saveCodeToDB();

        } else if (codeExists && codeExists.length) {
            this.setState({code: codeExists});

            let payload = {};
            payload[this.props.id] = this.state.code;
            this.props.submitCode(payload);
        }
    }

    challengeCodeExists = () => {
        // Check if code for each challenge exists, otherwise its going to go to github and get the code content
        let assignmentName = this.props.id.split('/').splice(0,2).join('/');
        let challengeName = this.props.id.split('/')[2];
        let codeExists = this.props.user.assignments.filter(singleAssgn => {
            return (singleAssgn.assignmentName === assignmentName) &&  (singleAssgn.code && singleAssgn.code.length) && (singleAssgn.code[challengeName]);
        });
        return !!codeExists.length ? codeExists.code[challengeName] : false;
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };

        return (
            <div className="repl" >
                <form>
                    <MonacoEditor
                        width="800"
                        height="600"
                        language="javascript"
                        theme="vs-dark"
                        value={code}
                        options={options}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                    />
                    <input type="submit" id="runCode" onClick={this.handleSubmit} placeholder="Run Code"/>
                    
                </form>
                
            </div>
        )
}};

//code already exists in state. I do want to overwrite it if it exists in the store, but does it need a different name. I think it does. And then write a function to check the store and overwrite if it's there
const mapStateToProps = state => ({
    challenges: state.challenges,
    user: state.user,
    assignment: state.assignment,
  });
  
  const mapDispatchToprops = (dispatch, getState) => ({
    submitCode: payload => dispatch(codeActions.addCode(payload)),
  });
  
  export default connect(mapStateToProps, mapDispatchToprops)(Repl);