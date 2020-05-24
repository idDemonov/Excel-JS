import { $ } from '@core/dom';
import { range } from '@core/utils';

export const handlerSelection = ($root, selection, event) => {
  const $target = $(event.target);
  if (event.shiftKey) {
    const $cells = matrix($target, selection.current).map((id) => {
      return $root.find(`[data-id="${id}"]`);
    });
    selection.selectGroup($cells);
  } else {
    selection.select($target);
    return $target;
  }
};

const matrix = ($target, $current) => {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};
