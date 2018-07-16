import React, { Component } from 'react';

//elements
import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";

//pages
import Home from "./components/pages/home.js";
// import One from "./Pages/One.js";
// import Two from "./Pages/Two.js";
// import Thr from "./Pages/Tre.js";

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

                  {/* <Route exact path="/one" component={One} />
          
                  <Route path="/two" component={Two}/>
                  
                  <Route exact path="/tre" component={Thr}/> */}
                  
                </main>
         
            </React.Fragment>
          </BrowserRouter>

        <Footer />

      </React.Fragment>
    );
  }
}

export default App;
