// Definition of reducers

import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  NUMBER_INPUT,
  OPERATOR_INPUT,
  EVALUATION,
  COMPUTE,
  FLOAT_POINT,
  CLEAR,
} from './actions';
import { removeLeftZero } from './tools';

// float flag
const FLOAT_MODE = 'FLOAT_MODE';
const INTEGER_MODE = 'INTEGET_MODE';

// Initial the holder
// holder is for store the last input number and evaluate the result
const holderInitialReducer = (state = '') => state;

// Initial the operator
const operatorInitialReducer = (state = '') => state;

// Initial number input to 0
const numberInitialReducer = (state = '0') => state;

// Initial computed flag
const computedInitialReducer = (state = false) => state;

// Initial resutl
const resultInitialReducer = (state = '') => state;

// computed flag 
const computedReducer = (state, action) => {
  switch (action.type) {
    case OPERATOR_INPUT:
      return true;
    case NUMBER_INPUT:
      return false;
    default:
      return state;
  }
};

const floatReducer = (state = INTEGER_MODE, action) => {
  switch (action.type) {
    case FLOAT_POINT:
      return FLOAT_MODE;
    default:
      return state;
  }
}

// Compute the input number
// isFloat is the flag to decide is there has a float point
const numberReducer = (state, action, isFloat) => {
  switch (action.type) {
    case NUMBER_INPUT:
      if (isFloat === FLOAT_MODE) {
        let nums = state.split('.');
        if (nums.length === 1) nums.push('');
        nums[1] += action.payload.number;
        return removeLeftZero(nums.join('.'));
      }
      return removeLeftZero(state + action.payload.number);
    case FLOAT_POINT:
      if (isFloat === FLOAT_MODE) {
        if (state.split('.').length === 1) {
          return removeLeftZero(state + '.');
        }
      }
      return state;
    case OPERATOR_INPUT:
      if (state === '0') return state;
      if (action.payload.operator === COMPUTE.PLUS_MINUS) {
        return /^-/.test(state) ? state.replace('-', '') : '-' + state;
      }
      return state;
    default:
      return state;
  }
};

const operatorReducer = (state, action) => {
  if (action.type === OPERATOR_INPUT) {
    if (action.payload.operator === COMPUTE.PLUS_MINUS) return state;
    let result = !state.computed
      ? evaluateTool(state.number, state.holder, state.operator)
      : state.number;
    return Object.assign({}, state, {
      holder: result,
      result: result,
      operator: action.payload.operator,
      number: '0',
      computed: computedReducer(state.computed, action),
    });
  }
  return state;
}

const evaluateTool = (number, holder, operator) => {
  if (!holder) return number;
  let _holder = Number(holder);
  let _number = Number(number);
  switch (operator) {
    case COMPUTE.ADD:
      return '' + (_holder + _number);
    case COMPUTE.SUBTRACT:
      return '' + (_holder - _number);
    case COMPUTE.MULTIPLY:
      return '' + (_holder * _number);
    case COMPUTE.DIVIDE:
      return '' + (_holder / _number);
    default:
      return number;
  }
}

const evaluateReducer = (state, action) => {
  if (action.type === EVALUATION) {
    let { holder, number } = state;
    return Object.assign({}, state, {
      number: '0',
      result: evaluateTool(number, holder, state.operator),
      isFloat: INTEGER_MODE,
      holder: '',
    });
  }
  return state;
}

const resultReducer = (state, action) => {
  return action.type === NUMBER_INPUT ? '' : state;
}

const inputReducer = (state, action) => {
  return Object.assign({}, state, {
    number: numberReducer(state.number, action, state.isFloat),
    computed: computedReducer(state.computed, action),
    result: resultReducer(state.result, action),
  });
}

const claerReducer = (state, action) => {
  if (action.type === CLEAR) {
    return Object.assign({}, state, {
      number: '0',
      holder: '',
      operator: '',
      isFloat: INTEGER_MODE,
    });
  }
  return state;
}

// Combine the initial reducer
const rootReducer = combineReducers({
  operator: operatorInitialReducer,
  number: numberInitialReducer,
  holder: holderInitialReducer,
  isFloat: floatReducer,
  computed: computedInitialReducer,
  result: resultInitialReducer,
});

// Chain the other reducers
export default reduceReducers(
  rootReducer,
  operatorReducer,
  evaluateReducer,
  inputReducer,
  claerReducer,
)
