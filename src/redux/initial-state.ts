import { TState, TStylesCell } from '@/interface';

const normalize = (state: TState): TState => ({
  ...state,
  currentText: '',
  currentStyle: defaultStyles,
});

export const initialState = (state: TState | null): TState => {
  return state ? normalize(state) : defaultState;
};

export const defaultStyles: TStylesCell = {
  textAlign: 'left',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'normal',
};

export const defaultTitle = 'Новая Таблица';

export const defaultState: TState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
  lastModifiedDate: new Date().toJSON(),
};
