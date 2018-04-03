import React from 'react';
// import electron from 'electron';
// import _ from 'lodash';

const electron = window.require('electron');

export default class DatabaseTester extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data: {},
      db: electron.remote.getGlobal('db')
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
        {/* { ...this.state.data}s */}
      </div>
    )
  }

}

