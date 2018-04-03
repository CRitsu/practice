// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Test from './animation/transition-test';
import Db from './db/dbtester';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Container is missing.');
}

ReactDOM.render(
  <div>
    {/* <Test.Demo2 /> */}
    <Test.Demo1 />
    <Db />
  </div>,
  root
);
registerServiceWorker();
