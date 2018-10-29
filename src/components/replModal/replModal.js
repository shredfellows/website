import React from 'react';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress } from '@fortawesome/free-solid-svg-icons';

// Components
import Output from '../output/output.js';

import './replModal.css';

class ReplModal extends React.Component {
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
              <button className="expand" onClick={this.props.toggle}>
                <FontAwesomeIcon icon={faCompress} />
              </button>
            </form>
          </div>
          <div className="output">
            <Output output={this.props.output} />
          </div>
        </div>
      </section>
    );
  }
} 

const mapStateToProps = state => ({
  output: state.challenges.output,
});

export default connect(mapStateToProps)(ReplModal);