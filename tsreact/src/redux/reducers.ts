import {
  ITimeUpdateAction,
  TIME_UPDATE,
} from './actions';


export interface IStoredState {
  time: string
}

function getTime(): IStoredState {
  return {
    time: new Date().toLocaleTimeString()
  }
}

export function timeReducer(state: IStoredState = getTime(), action: ITimeUpdateAction) {
  switch (action.type) {
    case TIME_UPDATE:
      return {...state, ...getTime()};
    default:
      return state;
  }
}
