//  @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { range } from 'lodash';
import reducers from './reducers';
import {
  input,
  float,
  evaluate,
  operator,
  claer,
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
  number: number | string,
  result: number | string,
  operator: string,
  handleNumberInput: (number | string) => void,
  handleFloatInput: (number | string) => void,
  handleEvaluate: () => void,
  handleOperatorInput: (number | string) => void,
  handleClear: () => void,
}> {

  render() {

    const {
      number,
      result,
      handleNumberInput,
      handleFloatInput,
      handleEvaluate,
      handleOperatorInput,
      handleClear
    } = this.props;

    return (
      <div className="calculator" >
        <div className="result" >{result ? result : number}</div>
        <div className="board" >
          <div className="left-board" >

            <ButtonBox value="." onClick={handleFloatInput} />
            <ButtonBox value={0} onClick={handleNumberInput} />
            <ButtonBox value="=" onClick={handleEvaluate} />

            {
              range(1, 10).map(i => (
                <ButtonBox key={'number' + i} value={i}
                  onClick={handleNumberInput} />
              ))
            }
            <ButtonBox value="AC" onClick={handleClear}
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
                  onClick={handleOperatorInput} />
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
  result: state.result,
});

// map functions to props fro dispatch action
const mapDispatchToProps = dispatch => {
  return {
    handleNumberInput: val => dispatch(input(val)),
    handleFloatInput: val => dispatch(float(val)),
    handleEvaluate: () => dispatch(evaluate()),
    handleOperatorInput: val => dispatch(operator(val)),
    handleClear: () => dispatch(claer()),
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
