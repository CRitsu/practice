import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';

import Spring from './animation/spring';
import Animation from './animation/transition-test';
import Db from './db/dbtester';

import config from './config';

const Navigation = () => (
  <div className="nav">
    <div className="title">{config.title}</div>
    <div className="links">
      {
        config.links.map(l => (
          <div key={l.link} className="link" >
            <Link to={l.link}>{l.label}</Link>
            <div className="line"/>
          </div>
        ))
      }
    </div>
  </div>
);

const NoMatch = () => (
  <h1>施工中</h1>
);

ReactDOM.render(
  <Router>
    <div>
      <div className="home">
        <Link to="/">HOME</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Navigation} />

        <Route path="/spring" component={Spring} />
        <Route path="/animation" component={Animation.Demo1} />
        <Route path="/db-tester-nedb" component={Db} />

        <Route component={NoMatch} />
        
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
