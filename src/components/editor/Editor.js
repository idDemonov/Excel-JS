import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';
import { $ } from '@core/dom';
import { range } from '@core/utils';

export class Editor extends ExcelComponent {
  static classes = ['excel__editor', 'editor'];

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(25);
  }

  init() {
    super.init();

    this.selection = new EditorSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    } else if (event.target.dataset.id) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) => {
          return this.$root.find(`[data-id="${id}"]`);
        });
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
}

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
