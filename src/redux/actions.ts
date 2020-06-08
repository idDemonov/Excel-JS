import * as types from '@/redux/types';
import {
  PayloadApplyStyle,
  PayloadChangeText,
  PayloadEditorResize,
  TStylesCell,
} from '@/interface';

export const editorResize = (payload: PayloadEditorResize) =>
  ({
    type: types.EDITOR_RESIZE,
    payload,
  } as const);

export const changeText = (payload: PayloadChangeText) =>
  ({
    type: types.CHANGE_TEXT,
    payload,
  } as const);

export const changeStyles = (payload: TStylesCell) =>
  ({
    type: types.CHANGE_STYLES,
    payload,
  } as const);

export const applyStyle = (payload: PayloadApplyStyle) =>
  ({
    type: types.APPLY_STYLE,
    payload,
  } as const);

export const changeTitle = (payload: string) =>
  ({
    type: types.CHANGE_TITLE,
    payload,
  } as const);

export const updateDate = () =>
  ({
    type: types.UPDATE_DATE,
  } as const);

export const initState = () =>
  ({
    type: types.INIT_STATE,
  } as const);
