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
