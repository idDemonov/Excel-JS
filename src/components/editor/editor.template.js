import { defaultStyles } from '@/constants';
import { camelCaseToDash } from '@core/utils';

const WORD_CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const toChar = (_, ind) => String.fromCharCode(WORD_CODES.A + ind);

const getWidth = (state, ind) => {
  return (state?.colState?.[ind] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state, ind) => {
  return (state?.rowState?.[ind] || DEFAULT_HEIGHT) + 'px';
};

const createRow = (num, content, state = {}) => {
  const height = getHeight(state, num);
  const resize = '<div class="resize" data-resize="row"></div>';

  return `
    <div class="row" data-type="resize" data-row="${num}" style="height: ${height}">
      <div class="row__number">${num ? num + resize : ''}</div>
      <div class="row__data">${content}</div>
    </div>`;
};

const toColumn = (state) => (letter, ind) => {
  const width = getWidth(state, ind);
  const resize = '<div class="resize" data-resize="col"></div>';

  return `
    <div style="width: ${width}" class="column" data-type="resize" data-col="${ind}">
       ${letter + resize}
    </div>
  `;
};

const toCell = (row, state) => (_, ind) => {
  const id = `${row}:${ind}`;
  const width = getWidth(state, ind);
  const style = Object.keys(defaultStyles)
    .map((key) => `${camelCaseToDash(key)}: ${defaultStyles[key]}`)
    .join(';');
  return `
    <div class="row__cell" 
         data-col="${ind}" 
         style="${style}; width: ${width}"
         data-id="${id}" 
         contenteditable>
        ${state.dataState?.[id] || ''}
    </div>
  `;
};

export const createTable = (rowCount = 15, state = {}) => {
  const colsCount = WORD_CODES.Z - WORD_CODES.A + 1;
  const rows = [];

  // Создание первой линии с буквами
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(state))
    .join('');
  rows.push(createRow(null, cols));

  // Создание остальных линий
  for (let count = 0; count < rowCount; count++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(count, state))
      .join('');
    const row = createRow(count + 1, cells, state);
    rows.push(row);
  }

  return rows.join('');
};
