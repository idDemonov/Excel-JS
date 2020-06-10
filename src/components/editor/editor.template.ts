import { toInlineStyles } from '@core/utils';
import { parse } from '@core/utils';
import { TState } from '@/interface';
import { defaultStyles } from '@/redux/initial-state';

type TWordCodes = {
  readonly [key: string]: number;
};

const WORD_CODES: TWordCodes = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const toChar = (_: void, ind: number): string =>
  String.fromCharCode(WORD_CODES.A + ind);

const getWidth = (state: TState, ind: number): string => {
  return (state.colState?.[ind] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state: TState, ind: number): string => {
  return (state.rowState?.[ind] || DEFAULT_HEIGHT) + 'px';
};

const createRow = (
  num: number | null,
  content: string,
  state: TState
): string => {
  const height = num ? getHeight(state, num) : DEFAULT_HEIGHT;
  const resize = '<div class="resize" data-resize="row"></div>';

  return `
    <div class="row" data-type="resize" data-row="${num}" style="height: ${height}">
      <div class="row__number">${num ? num + resize : ''}</div>
      <div class="row__data">${content}</div>
    </div>`;
};

const toColumn = (state: TState) => (letter: string, ind: number): string => {
  const width = getWidth(state, ind);
  const resize = '<div class="resize" data-resize="col"></div>';

  return `
    <div style="width: ${width}" class="column" data-type="resize" data-col="${ind}">
       ${letter + resize}
    </div>
  `;
};

const toCell = (row: number, state: TState) => (
  _: void,
  ind: number
): string => {
  const id = `${row}:${ind}`;
  const width = getWidth(state, ind);

  const style = toInlineStyles({
    ...defaultStyles,
    ...state.stylesState?.[id],
  });
  return `
    <div class="row__cell" 
         data-col="${ind}" 
         style="${style}; width: ${width}"
         data-id="${id}" 
         data-value="${state.dataState?.[id] || ''}"
         contenteditable>
        ${parse(state.dataState?.[id] || '')}
    </div>
  `;
};

export const createTable = (rowCount = 15, state: TState): string => {
  const colsCount = WORD_CODES.Z - WORD_CODES.A + 1;
  const rows: string[] = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn(state))
    .join('');
  rows.push(createRow(null, cols, state));

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
