import React from 'react';

import Header from '../header/header.js';
import Home from '../home/home.js';

export default class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
    };
  }

  loadingStatus = status => {
    this.setState({ loading: status });
  }

  render() {
    return(
      <React.Fragment>
        <Header loading={this.loadingStatus} />
        <main>
          <Home loading={this.loadingStatus} loadingStatus={this.state.loading} />
        </main>
      </React.Fragment>
    );
  }
}