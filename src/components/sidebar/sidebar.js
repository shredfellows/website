import React from 'react';
import './sidebar.css';
import uuid from 'uuid';

export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        // console.log('in s-bar:', this.props.topics);

        return (
            <div className="sidebar">
            <ul>
            {

                this.props.topics && Object.keys(this.props.topics).map((el, i) => (
                <li key={uuid()}>{el}
                
                    <ul>
                        {Object.keys(this.props.topics[el]).map((subEl, j) => (
                            <li key={uuid()}><a onClick={() => this.props.getAss(el, subEl)}>{subEl}</a></li>
                        ))}
                    </ul>
                
                </li>
                ))
            }
            </ul>
            </div>
        )
}};