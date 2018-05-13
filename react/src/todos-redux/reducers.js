// reducers

import { combineReducers } from 'redux';
import ReducerChain from 'reduce-reducers';
import {
  getTime,
  setStorage,
  getStorage,
} from './utils';

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


// Todos reducer
const todos = (state, action) => {
  if (action.type === ADD_TODO) {
    // check null string
    let msg = action.payload.message
    if (!msg) return state;

    let obj = {
      id: new Date().getTime(),
      message: msg,
      completed: false
    }
    let n = state.concat(obj);
    setStorage('todos', n);
    return n;
  }
  let s = getStorage('todos');
  return s ? s : [];
}


const RootReducer = combineReducers({
  time,
  toggleMenu,
  todos,
});

export default ReducerChain(
  RootReducer,
);
