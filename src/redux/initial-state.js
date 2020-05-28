import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
  lastModifiedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyle: defaultStyles,
});

export const initialState = (state) => {
  return state ? normalize(state) : defaultState; // WTF normalize!?
};
