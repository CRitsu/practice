// reducers

import { combineReducers } from 'redux';
import ReducerChain from 'reduce-reducers';
import { getTime } from './utilities';

import {
  TIME_UPDATE,
  TOGGLE_MENU,
  ADD_TODO,
} from './actions';


const time = (state = getTime(), action) => {
  switch (action.type) {
    case TIME_UPDATE:
      return getTime();
    default:
      return state;
  }
}

const toggleMenu = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  if (action.type === ADD_TODO) {
    let obj = {
      id: new Date().getTime(),
      message: action.payload.message,
      completed: false
    }
    return state.concat(obj);
  }
  return state;
}


const RootReducer = combineReducers({
  time,
  toggleMenu,
  todos,
});

export default ReducerChain(
  RootReducer,
);
