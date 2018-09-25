import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './components/landing/landing.js';
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
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Landing} />
            <Header loading={this.loadingStatus} />
            <main>
              <Home loading={this.loadingStatus} loadingStatus={this.state.loading}/>  
            </main>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}