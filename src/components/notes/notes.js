import React from 'react';
import './notes.css';


import superagent from 'superagent';


/** 
 * Notes component to allow the user to take notes.  Initial state is set to a 
 * blank string.  Note is saved into the database for later retrieval.
 */
export default class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notes: '' }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    let newNote = e.target.value;
    this.setState({ notes: newNote });
  }

  render() {
    return (
      <div className="notes">
        <form onChange={this.onChange}>
          <label>
            Add Note:
            <input type="text" name="note" />
          </label>
          <input type="submit" id="submitNotes" onClick={this.handleSubmit} placeholder="TESTING" />
        </form>
      </div>)
  }
}