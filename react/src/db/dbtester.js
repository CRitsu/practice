import React from 'react';
import Datastore from 'nedb';

// import electron from 'electron';
// import _ from 'lodash';

// const electron = window.require('electron');

export default class DatabaseTester extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {},
      // db: electron.remote.getGlobal('db')
      db: new Datastore({ filename: 'test.db', autoload: true })
    };
  }

  componentDidMount() {
    this.state.db.find({}, (error, doc) => {
      this.setState({ data: doc });
    });
  }

  handleChange(e) {
    this.setState({ msg: e.target.value })
  }

  handleSubmit() {
    this.state.db.insert({ massage: this.state.msg });
    this.state.db.find({}, (error, doc) => {
      this.setState({ data: doc });
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)} >store</button>
        <pre ><code>
          {
            JSON.stringify(this.state.data, null, '\t')
          }
        </code></pre>
      </div>
    )
  }

}

