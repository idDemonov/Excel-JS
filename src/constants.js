export const defaultStyles = {
  textAlign: 'left',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'normal',
};

export const defaultTitle = 'Новая Таблица';

export const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
  lastModifiedDate: new Date().toJSON(),
};
