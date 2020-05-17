const WORD_CODES = {
  A: 65,
  Z: 90,
};

const createRow = (num, content) => `
    <div class="row">
      <div class="row__number">${num ? num : ''}</div>
      <div class="row__data">${content}</div>
    </div>
`;

const toCell = () => `<div class="row__cell" contenteditable></div>`;

const toChar = (_, idx) => String.fromCharCode(WORD_CODES.A + idx);

const toColumn = letter => `<div class="column">${letter}</div>`;

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
