import React from 'react';
import './notes.css';


import superagent from 'superagent';


/**
 * Notes component to allow the user to take notes.  On the state is set to blank. 
 * The note is saved in the database for later retrevial.
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