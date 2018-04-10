/* @flow */

import React from 'react';
import { Spring, Transition } from 'react-spring';

import './spring.css';

export default class SpringTest extends React.Component<{}, {
  toggle: boolean
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      toggle: true,
    }
  }

  handleToggle() {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  
  render() {
    return (
      <div className="re" onClick={this.handleToggle.bind(this)} >
        <Spring from={{ left: '0px' }} to={{ left: '500px' }} >
          {
            styles => <div className="re" style={styles} >test</div>
          }
        </Spring>
        <Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
          { 
            this.state.toggle 
            ? styles => <div style={styles}>A</div> 
            : styles => <div style={styles}>B</div>
          }
        </Transition>
      </div>
    );
  }
}

