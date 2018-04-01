// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Test from './transition-test';
import Db from './dbtester';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Container is missing.');
}

ReactDOM.render(
  <div>
    {/* <App /> */}
    {/* <Test.Demo2 /> */}
    <Test.Demo1 />
    <Db />
  </div>,
  root
);
registerServiceWorker();
