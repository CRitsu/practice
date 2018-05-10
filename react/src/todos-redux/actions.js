// Definition of Actions

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TIME_UPDATE = 'TIME_UPDATE';
export const TOGGLE_MENU = 'TOGGLE_MENU';


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
