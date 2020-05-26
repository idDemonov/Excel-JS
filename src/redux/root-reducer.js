import * as types from '@/redux/constants';

export const rootReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.EDITOR_RESIZE:
      const field = payload.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [field]: {
          ...state[field],
          [payload.id]: payload.value,
        },
      };
    case types.CHANGE_TEXT:
      return {
        ...state,
        currentText: payload.value,
        dataState: {
          ...state.dataState,
          [payload.id]: payload.value,
        },
      };
    default:
      return state;
  }
};
