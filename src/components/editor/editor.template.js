const WORD_CODES = {
  A: 65,
  Z: 90,
};

const createRow = (num, content) => {
  const resize = '<div class="resize" data-resize="row"></div>';

  return `
    <div class="row" data-type="resize">
      <div class="row__number">${num ? num + resize : ''}</div>
      <div class="row__data">${content}</div>
    </div>`;
};

const toCell = (_, ind) => {
  return `<div class="row__cell" data-col="${ind}" contenteditable></div>`;
};

const toChar = (_, ind) => String.fromCharCode(WORD_CODES.A + ind);

const toColumn = (letter, ind) => {
  const resize = '<div class="resize" data-resize="col"></div>';

  return `
    <div class="column" data-type="resize" data-col="${ind}">
       ${letter + resize}
    </div>`;
};

export const createTable = (rowCount = 15) => {
  const colsCount = WORD_CODES.Z - WORD_CODES.A + 1;
  const rows = [];

  // Создание первой линии с буквами
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
  rows.push(createRow(null, cols));

  // Создание остальных линий
  const cells = new Array(colsCount).fill('').map(toCell).join('');
  for (let i = 0; i < rowCount; i++) rows.push(createRow(i + 1, cells));

  return rows.join('');
};
