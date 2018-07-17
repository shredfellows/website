import React from 'react';
import './repl.css';

export default class Repl extends React.Component {
    constructor(props){
        super(props)
        this.state={code:{}};
        this.updateState=this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState(e){
        e.preventDefault;
        let input= e.target.value;
        this.setState({code:input});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.runCode(this.state.code);
    }


    render() {
        return (
            <div className="repl">
                <form>
                    <textarea name="repl_env" id="repl" onChange={this.updateState} placeholder="repl environment"></textarea>
                    <input type="submit" id="runCode" onClick={this.handleSubmit} placeholder="Run Code"/>
                    {/* <input id="saveCode">Save Code</input> */}
                </form>
            </div>
        )
}};