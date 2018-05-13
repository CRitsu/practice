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
  TOGGLE_TODO,
  TOGGLE_SHOW,
  INPUT,
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
      completed: false,
      update: new Date().getTime()
    }
    let n = state.concat(obj);
    // storage data
    setStorage('todos', n);
    return n;
  } else if (action.type === TOGGLE_TODO) {
    let s = state.slice();
    s.forEach(element => {
      if (element.id === action.payload.id) {
        element.completed = !element.completed;
        element.update = new Date().getTime();
      }
      return element;
    });
    // storage data
    setStorage('todos', s)
    return s;
  }
  let s = getStorage('todos');
  return s ? s : [];
}

const isShow = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SHOW:
      return !state;
    default:
      return state;
  }
}

const inputValue = (state = '', action) => {
  switch (action.type) {
    case INPUT:
      return action.payload.value;
    case ADD_TODO:
      return '';
    default:
      return state;
  }
}

const RootReducer = combineReducers({
  time,
  inputValue,
  toggleMenu,
  todos,
  isShow,
});

export default ReducerChain(
  RootReducer,
);
