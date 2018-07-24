// @flow

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LinkButton, MatchPathTest } from './components';
import './App.css';



class App extends Component<{}> {
  render() {
    return (
      <Router className="App">
        <div>
          <LinkButton 
            linkTo="about"
            name="about"
            classes="hover-dark"
          />
          <LinkButton 
            linkTo="timeline" 
            name="timeline" 
            color="white" 
            background="black"
            classes="hover-light"
          />
          <LinkButton linkTo="" name="Home" />
          <Route path="/about">
            {({ match }) => <MatchPathTest match={match} message="About!" />}
          </Route>
          <Route path="/timeline">
            {({ match }) => <MatchPathTest match={match} message="Timeline!" />}
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
