// Definition of Actions

export const ADD_TODO = 'ADD_TODO';
export const INPUT = 'INPUT';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TIME_UPDATE = 'TIME_UPDATE';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_SHOW = 'TOGGLE_SHOW';
export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';


export const timeUpdate = () => ({
  type: TIME_UPDATE
});

export const toggleMenu = () => ({
  type: TOGGLE_MENU
});

export const addTodo = string => ({
  type: ADD_TODO,
  payload: {
    message: string,
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {
    id: id,
  }
});

export const toggleShow = () => ({
  type: TOGGLE_SHOW
});

export const input = val => ({
  type: INPUT,
  payload: {
    value: val,
  }
});

export const openPopup = () => ({
  type: OPEN_POPUP
});

export const closePopup = () => ({
  type: CLOSE_POPUP
});
