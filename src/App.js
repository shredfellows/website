import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './components/pages/landing.js';
import Home from './components/pages/home.js';
import Header from './components/header/header.js';

import createStore from './store/';
const store = createStore();

/**
 * Create and render the Application.
 */
export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading:true,
      user:{},
    };

    this.loadingStatus = this.loadingStatus.bind(this);
  }

  loadingStatus(status){
    this.setState({loading:status});
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Header loading={this.loadingStatus} />
          <BrowserRouter>
            <main>
              <Route exact path='/' component={Landing}/>
              <Home loading={this.loadingStatus} loadingStatus={this.state.loading}/>  
            </main>
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}