import { createStore } from '@/redux/create-store';

const reducer = (state, actions) => {
  switch (actions.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

describe('create-store', () => {
  let store = null;
  let state = null;
  let subscriber = null;

  beforeEach(() => {
    state = { count: 0 };
    store = createStore(reducer, state);
    subscriber = jest.fn();
  });

  test('return object store', () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  test('return default state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
    expect(store.getState()).toEqual(state);
  });

  test('change new state if dispatch action', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
    expect(store.getState()).not.toEqual(state);
  });

  test('not change state if action unknown', () => {
    store.dispatch({ type: 'UNKNOWN_TYPE' });
    expect(store.getState()).toEqual(state);
  });

  test('call subscriber function', () => {
    store.subscribe(subscriber);
    store.dispatch({ type: 'ADD' });
    expect(subscriber).toHaveBeenCalledWith(store.getState());
  });

  test('not call subscriber if call unsubscriber', () => {
    const sub = store.subscribe(subscriber);
    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });
    expect(subscriber).not.toHaveBeenCalled();
  });
});
