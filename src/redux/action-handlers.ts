import {
  PayloadApplyStyle,
  PayloadChangeText,
  PayloadEditorResize,
  TState,
  TStylesCell,
} from '@/interface';

export const handlerEditorResize = (
  state: TState,
  payload: PayloadEditorResize
): TState => {
  const field = payload.type === 'col' ? 'colState' : 'rowState';
  return {
    ...state,
    [field]: {
      ...state[field],
      [payload.id]: payload.value,
    },
  };
};

export const handlerChangeText = (
  state: TState,
  payload: PayloadChangeText
): TState => {
  return {
    ...state,
    currentText: payload.value,
    dataState: {
      ...state.dataState,
      [payload.id]: payload.value,
    },
  };
};

export const handlerChangeStyles = (
  state: TState,
  payload: TStylesCell
): TState => {
  return { ...state, currentStyle: payload };
};

export const handlerApplyStyle = (
  state: TState,
  payload: PayloadApplyStyle
): TState => {
  const newStyles = { ...state.stylesState };
  payload.ids.forEach((id: string): void => {
    newStyles[id] = { ...newStyles[id], ...payload.value };
  });
  return {
    ...state,
    stylesState: newStyles,
    currentStyle: { ...state.currentStyle, ...payload.value },
  };
};

export const handlerChangeTitle = (state: TState, payload: string): TState => {
  return { ...state, title: payload };
};

export const handlerUpdateDate = (state: TState): TState => {
  return { ...state, lastModifiedDate: new Date().toJSON() };
};
