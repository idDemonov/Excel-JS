import * as types from '@/redux/constants';

export const editorResize = (payload) => {
  return {
    type: types.EDITOR_RESIZE,
    payload,
  };
};

export const changeText = (payload) => {
  return {
    type: types.CHANGE_TEXT,
    payload,
  };
};

export const changeStyles = (payload) => {
  return {
    type: types.CHANGE_STYLES,
    payload,
  };
};

export const applyStyle = (payload) => {
  return {
    type: types.APPLY_STYLE,
    payload,
  };
};

export const changeTitle = (payload) => {
  return {
    type: types.CHANGE_TITLE,
    payload,
  };
};
