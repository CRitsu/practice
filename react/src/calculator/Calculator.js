//  @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { range } from 'lodash';
import reducers from './reducers';
import {
  input,
} from './actions';


class Calculator extends React.Component<{
  number: number,
  operator: string,
  onClick: number => void,
}> {

  render() {

    return (
      <div>
        <div>{this.props.number}</div>
        <div>
          {
            range(10).map(i => (
              <div key={i} onClick={() => this.props.onClick(i)}>
                {i}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const store = createStore(reducers);
const mapStateToProps = state => ({
  number: state.number,
});
const mapDispatchToProps = dispatch => {
  return {
    onClick: number => dispatch(input(number)),
  };
};
const CalculatorContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Calculator);
const cal =  () => (
  <Provider store={store}>
    <CalculatorContainer />
  </Provider>
)

export default cal;
