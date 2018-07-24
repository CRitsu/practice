// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Game from './game';
import registerServiceWorker from './registerServiceWorker';

var root = document.getElementById('root');

if (!root) throw new Error("Container is missing!");

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/game" component={Game} />
    </div>
  </Router>,
  root
);
registerServiceWorker();
