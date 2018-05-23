
export const TIME_UPDATE = 'TIME_UPDATE';
export type TIME_UPDATE = typeof TIME_UPDATE;

export interface ITimeUpdateAction {
  type: TIME_UPDATE
}

export function timeUpdateAction(): ITimeUpdateAction {
  return {
    type: TIME_UPDATE
  }
}
