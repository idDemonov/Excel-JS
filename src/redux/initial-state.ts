import { defaultState, defaultStyles } from '@/constants';

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyle: defaultStyles,
});

export const initialState = (state) => {
  return state ? normalize(state) : defaultState;
};
