import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './components/landing/landing.js';
import Dashboard from './components/dashboard/dashboard.js';

import createStore from './store/';
const store = createStore();

/**
 * Create and render the Application.
 */
export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={Dashboard} />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}