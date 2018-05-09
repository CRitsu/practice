// reducers

import { combineReducers } from 'redux';
import ReducerChain from 'reduce-reducers';
import { getTime } from './utilities';

import {
  TIME_UPDATE,
} from './actions';


const time = (state = getTime(), action) => {
  switch (action.type) {
    case TIME_UPDATE:
      return getTime();
    default:
      return state;
  }
}


const RootReducer = combineReducers({
  time,
});

export default ReducerChain(
  RootReducer,
);
