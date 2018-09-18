import React from 'react';
import './sidebar.css';
import uuid from 'uuid';

/** 
 * Component for the menu of topics and assignments.
 */
export default class Sidebar extends React.Component {

  render() {

    return (
      <div id="sidebar" className="sidebar">
        <h2>Challenges</h2>
        <ul>
          {
            this.props.topics && Object.keys(this.props.topics).map(el => (
              <li key={uuid()}>{el}
                
                <ul>
                  {Object.keys(this.props.topics[el]).map(subEl => (
                    <li key={uuid()}><a onClick={() => this.props.getAssign(el, subEl)}>{subEl}</a></li>
                  ))}
                </ul>
                
              </li>
            ))
          }
        </ul>
      </div>
    );
  }}