import React from 'react';
import './repl.css';
import MonacoEditor from 'react-monaco-editor';

export default class Repl extends React.Component {
    constructor(props){
        super(props)
        this.state={code:''}
        this.updateState=this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState(e){
        e.preventDefault;
        console.log(e.target);
        // let input= e.target.value;
        // this.setState({code:input});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.runCode(this.state.code);
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };

        return (
            <div className="repl" >
                {/* <form>
                    <textarea name="repl_env" id="repl"  placeholder="repl environment"></textarea>
                    <input type="submit" id="runCode" onClick={this.handleSubmit} placeholder="Run Code"/>
                    
                </form> */}
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
            </div>
        )
}};