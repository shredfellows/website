import React from 'react';
import MonacoEditor from 'react-monaco-editor';

// Components
import '../repl/repl.js';

import './replModal.css';

export default class ReplModal extends React.Component {
  render() {
    return (
      <section className="repl-modal">
        <div className="modal-container">
          <div className="repl" >
            <form>
              <MonacoEditor
                language="javascript"
                theme=""
                value={this.props.code}
                options={this.props.options}
                onChange={this.props.onChange}
                editorDidMount={this.props.editorDidMount}
              />
              <button className="submit-button" onClick={this.props.saveCode}>Save Code</button>
              <button className="submit-button" id="runCode" onClick={this.props.handleSubmit}>Run Code</button>
              {/* <button className="expand" onClick={this.expandRepl}>
                <FontAwesomeIcon icon={faExpand} />
              </button> */}
            </form>
          </div>
        </div>
      </section>
      
    );
  }
} 