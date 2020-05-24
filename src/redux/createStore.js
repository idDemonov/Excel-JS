export const createStore = (rootReducer, initialState) => {
  let state = rootReducer(initialState, '__INIT__');
  let listeners = [];

  return {
    subscribe(listener) {
      listeners.push(listener);
      return {
        unsubscribe() {
          listeners = listeners.filter((fn) => fn !== listener);
        },
      };
    },

    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return state;
    },
  };
};
