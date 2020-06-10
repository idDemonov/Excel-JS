import { EditorSelection } from '@/components/editor/Editor-selection';

import { IDom, Iid } from '@/interface';

export const keyboardHandler = (
  event: KeyboardEvent,
  selection: EditorSelection,
  $root: IDom
): IDom | void => {
  const keys: string[] = [
    'Enter',
    'Tab',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
  ];

  const { key } = event;
  if (!selection.current) throw Error(`${selection} не определён`);

  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault();
    const id = selection.current.idCell();
    const $next = $root.find(nextSelector(key, id));
    selection.select($next);
    return $next;
  }
};

export const nextSelector = (key: string, { col, row }: Iid): string => {
  const MIN_VALUE = 0;
  const MAX_VALUE = 24; // Задать ограничение правильно!!!

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE ? MAX_VALUE : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE ? MAX_VALUE : col + 1;
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
