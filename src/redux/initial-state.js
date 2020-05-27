import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
