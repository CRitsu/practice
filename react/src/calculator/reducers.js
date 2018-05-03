// Definition of reducers

import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  NUMBER_INPUT,
  OPERATOR_INPUT,
  INPUT_HOLDER,
  EVALUATION,
  COMPUTE,
  input,
  inputHolder,
  operator,
  evaluate
} from './actions';

const numberReducer = (state = 0, action) => {
  switch (action.type) {
    case NUMBER_INPUT:
      return state * 10 + action.payload.number
  }
};

const rootReducer = combineReducers({
  number: numberReducer,
});

export default reduceReducers(
  rootReducer,

)
