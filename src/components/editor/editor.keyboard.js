export const keyboardHandler = (event, selection, $root) => {
  const keys = [
    'Enter',
    'Tab',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
  ];

  const { key } = event;

  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault();
    const id = selection.current.id(true);
    const $next = $root.find(nextSelector(key, id));
    selection.select($next);
  }
};

export const nextSelector = (key, { col, row }) => {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};
