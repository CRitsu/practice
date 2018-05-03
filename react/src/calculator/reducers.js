// Definition of reducers

import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  NUMBER_INPUT,
  OPERATOR_INPUT,
  EVALUATION,
  COMPUTE,
} from './actions';

const numberReducer = (state = 0, action) => {
  switch (action.type) {
    case NUMBER_INPUT:
      return state * 10 + action.payload.number;
    default:
      return state;
  }
};

const operatorReducer = (state = '', action) => {
  switch (action.type) {
    case OPERATOR_INPUT:
      return action.payload.operator;
    default:
      return state;
  }
}

const operationReducer = (state, action) => {
  switch (action.type) {
    case OPERATOR_INPUT:
      return Object.assign({}, state, {
        holder: state.number,
        number: 0
      });
    default:
      return state;
  }
}

const evaluateReducer = (state, action) => {
  if (action.type === EVALUATION) {
    switch (state.operator) {
      case COMPUTE.ADD:
        return Object.assign({}, state, {
          number: state.holder + state.number
        });
      case COMPUTE.SUBTRACT:
        return Object.assign({}, state, {
          number: state.holder - state.number
        });
      case COMPUTE.MULTIPLY:
        return Object.assign({}, state, {
          number: state.holder * state.number
        });
      case COMPUTE.DIVIDE:
        return Object.assign({}, state, {
          number: state.holder / state.number
        });
      default:
        return state;
    }
  }
  return state;
}

const rootReducer = combineReducers({
  number: numberReducer,
  operator: operatorReducer,
});

export default reduceReducers(
  rootReducer,
  operationReducer,
  evaluateReducer,
)
