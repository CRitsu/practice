//  @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { range } from 'lodash';
import reducers from './reducers';
import {
  input,
  float,
  COMPUTE,
} from './actions';

import './calculator.css';


type Props = {
  value: number | string,
  onClick: (number | string) => void,
  cssClass?: string
}

// Create input button
// Should pass the class name
const ButtonBox = (props: Props) => (
  <div className={props.cssClass ? props.cssClass : 'button-box'}
    onClick={() => props.onClick(props.value)}>
    {props.value}
  </div>
);

// The calculator UI component
class Calculator extends React.Component<{
  number: number,
  operator: string,
  handleNumberInput: (number | string) => void,
  handleFloatInput: (number | string) => void,  
}> {

  render() {

    return (
      <div className="calculator" >
        <div className="result" >{this.props.number}</div>
        <div className="board" >
          <div className="left-board" >

            <ButtonBox value="." onClick={this.props.handleFloatInput} />
            <ButtonBox value={0} onClick={this.props.handleNumberInput} />
            <ButtonBox value="=" onClick={this.props.handleNumberInput} />

            {
              range(1, 10).map(i => (
                <ButtonBox key={'number' + i} value={i}
                  onClick={this.props.handleNumberInput} />
              ))
            }
            <ButtonBox value="All Clean" onClick={this.props.handleFloatInput}
              cssClass="button-3-cell" />
          </div>
          <div className="right-board" >
            {
              [
                COMPUTE.PLUS_MINUS,
                COMPUTE.DIVIDE,
                COMPUTE.MULTIPLY,
                COMPUTE.SUBTRACT,
                COMPUTE.ADD
              ].map((o, i) => (
                <ButtonBox key={'operator' + i} value={o}
                  onClick={this.props.handleNumberInput} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

// create store
const store = createStore(reducers);

// map the state to props
const mapStateToProps = state => ({
  number: state.number,
});

// map functions to props fro dispatch action
const mapDispatchToProps = dispatch => {
  return {
    handleNumberInput: val => dispatch(input(val)),
    handleFloatInput: val => dispatch(float(val)),
  };
};

// create container component to wrap the ui component
// and map state and functions to props
const CalculatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

// Just a demo, and just a part of this app is using Redux
// We use Provider to wrap the part which is using Redux, and pass the store
const cal = () => (
  <Provider store={store}>
    <CalculatorContainer />
  </Provider>
)

// pass the demo
export default cal;
