import React, { Component } from 'react';
import Header from "./components/header/header.js";
import { Provider } from 'react-redux';
import Home from "./components/pages/home.js";
import { BrowserRouter} from 'react-router-dom';
import * as api from './lib/api.js';

import createStore from './store/';
const store = createStore();

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      loading:true,
      user:{},
    }
    this.loadingStatus=this.loadingStatus.bind(this);
  }

  loadingStatus(status){
    this.setState({loading:status});
  }

  //TODO: Change cookie splitting for token to be more robust (i.e., handle other cookies)
  async componentWillMount(){
    if(document.cookie && document.cookie.match(/token/i)){
      let token = document.cookie.split('Token=')[1];
      let user = await api.login(token);
      console.log(user);
      this.setState({user});
    }
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
        <Header loading={this.loadingStatus} />
        <BrowserRouter>
          <main>
            <Home loading={this.loadingStatus} user={this.state.user} loadingStatus={this.state.loading}/>  
          </main>
        </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
