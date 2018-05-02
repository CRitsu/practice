//  @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { range } from 'lodash';


const NumberBox = (props: {number: number, onClick: () => void}) => (
  <div className="number-box" onClick={props.onClick} >
    {props.number}
  </div>
);

class Calculator extends React.Component<{value: number}> {

  render() {
    const onClick = () => {};
    return (
      <div>
        <div>Value:{this.props.value}</div>
        {
          range(10).map((i) => (
            <NumberBox 
              key={i} 
              number={i} 
              onClick={onClick} />
          ))
        }
      </div>
    );
  }

}


const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return 1;
    default:
      return 0;
  }
};

const store = createStore(reducer);
const mapToProps = state => ({
  value: state
});
const C = connect(
  mapToProps,
)(Calculator);

const Cal = (
  <Provider store={store}>
    <C />
  </Provider>
);

export default Cal;
