import { rootReducer } from '@/redux/root-reducer';

describe('root-reducer', () => {
  let state = null;

  beforeEach(() => {
    state = {
      title: 'Title',
      colState: {},
      rowState: {},
      dataState: {},
      stylesState: {},
      currentText: '',
      currentStyle: 'style',
      lastModifiedDate: 'date',
    };
  });

  test('return state', () => {
    expect(rootReducer(state, '')).toBeInstanceOf(Object);
    expect(rootReducer(state, '')).toEqual(state);
  });

  test('change should return new state', () => {
    expect(rootReducer(state, '')).toBeInstanceOf(Object);
    expect(rootReducer(state, { type: 'UPDATE_DATE' })).not.toEqual(state);
    expect(rootReducer(state, { type: 'UPDATE_DATE' })).not.toBe(state);
  });
});
