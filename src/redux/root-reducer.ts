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
    case types.CHANGE_STYLES:
      return { ...state, currentStyle: payload };
    case types.APPLY_STYLE:
      const newStyles = { ...state.stylesState };
      payload.ids.forEach((id) => {
        newStyles[id] = { ...newStyles[id], ...payload.value };
      });
      return {
        ...state,
        stylesState: newStyles,
        currentStyle: { ...state.currentStyle, ...payload.value },
      };
    case types.CHANGE_TITLE:
      return { ...state, title: payload };
    case types.UPDATE_DATE:
      return { ...state, lastModifiedDate: new Date().toJSON() };
    default:
      return state;
  }
};
