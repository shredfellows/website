import React, { Component } from 'react';
import Header from './components/header/header.js';
import { Provider } from 'react-redux';
import Home from './components/pages/home.js';
import { BrowserRouter} from 'react-router-dom';

import createStore from './store/';
const store = createStore();

/**
 * Create and render the Application.
 */
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true,
      user:{},
    };
    this.loadingStatus=this.loadingStatus.bind(this);
  }

  loadingStatus(status){
    this.setState({loading:status});
  }

  

  //TODO: Change cookie splitting for token to be more robust (i.e., handle other cookies)
  

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Header loading={this.loadingStatus} />
          <BrowserRouter>
            <main>
              <Home loading={this.loadingStatus} loadingStatus={this.state.loading}/>  
            </main>
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
