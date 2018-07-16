import React, { Component } from 'react';

//elements
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";

//pages
import Home from "./Pages/Home.js";
import One from "./Pages/One.js";
import Two from "./Pages/Two.js";
import Thr from "./Pages/Tre.js";

import { BrowserRouter, Route } from 'react-router-dom';

// import './App.css';

class App extends Component {

  render() {
    return (
      <React.Fragment>

        <Header />

          <BrowserRouter>
            <React.Fragment>
               
                <main>

                  <Route exact path="/" component={Home} />

                  <Route exact path="/one" component={One} />
          
                  <Route path="/two" component={Two}/>
                  
                  <Route exact path="/tre" component={Thr}/>
                  
                </main>
         
            </React.Fragment>
          </BrowserRouter>

        <Footer />

      </React.Fragment>
    );
  }
}

export default App;
