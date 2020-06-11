import { ActionsType, TReducer, TState, TStore } from '@/interface';
import { initState } from '@/redux/actions';

export const createStore = (
  rootReducer: TReducer,
  initialState: TState
): TStore => {
  let state = rootReducer(initialState, initState());
  let listeners: ((state: TState) => void)[] = [];

  return {
    subscribe(listener: (state: TState) => void): { unsubscribe: () => void } {
      listeners.push(listener);
      return {
        unsubscribe(): void {
          listeners = listeners.filter((fn) => fn !== listener);
        },
      };
    },

    dispatch(action: ActionsType): void {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState(): TState {
      return JSON.parse(JSON.stringify(state));
    },
  };
};
