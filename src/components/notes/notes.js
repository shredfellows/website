import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as utils from '../../lib/utils.js';
import * as api from '../../lib/api.js';
import * as userActions from '../../store/actions/users.js';

import './notes.css';


/**
 * Notes component to allow the user to take notes.  On the state is set to blank. 
 * The note is saved in the database for later retrevial.
 */
class Notes extends React.Component {

  constructor(props) {
    super(props)
    this.state = { notes: '' }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    let assignmentId = this.props.assignment._id;
    let endpoint = `assignment/note/${assignmentId}`;
    let notes = this.state.notes;
    let payload = {
      endpoint: endpoint,
      body: {notes},
    };

   let data = await api.put(payload);
   
   let assignName = this.props.assignment.assignmentName;
   let action = { assignName, notes };
   this.props.addNoteToUser(action);
  }

  onChange(e) {
    let newNote = e.target.value;
    this.setState({ notes: newNote });
  }

  render() {
    let assignmentArray = this.props.user && this.props.user.assignments && this.props.user.assignments.filter(single => single.assignmentName === this.props.assignment.assignmentName);
    console.log({assignmentArray});
    let assignmentNotes = assignmentArray && assignmentArray[0] && assignmentArray[0].notes;
    return (
      <div className="notes">
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Note:
          {
            utils.renderIf (
              assignmentNotes,
                <textarea id="submitNotes" onChange={this.onChange} defaultValue={assignmentNotes}></textarea>,
                <textarea id="submitNotes" onChange={this.onChange} placeholder="Take Notes Here"></textarea>
            )
          }
          <input type="submit" />
          </label>
        </form>
      </div>)
  }
}

const mapStateToProps = state => ({
  challenges: state.challenges,
  user: state.user,
  assignment: state.assignment,
});

const mapDispatchToprops = (dispatch, getState) => ({
  addNoteToUser: payload => dispatch(userActions.addNoteToUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Notes);