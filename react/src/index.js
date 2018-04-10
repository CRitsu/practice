// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';

import Spring from './animation/spring';
import Test from './animation/transition-test';
// import Db from './db/dbtester';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Container is missing.');
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" >
        <div>
          {/* <Test.Demo2 /> */}
          <Test.Demo1 />
          {/* <Db /> */}
          <Link to="/animate" >Animate</Link>
        </div>
      </Route>
      <Route path="/animate" component={Spring} />
    </Switch>
  </Router>,
  root
);
registerServiceWorker();
