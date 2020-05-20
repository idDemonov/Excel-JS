import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';

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
    if (event.target.dataset.resize) resizeHandler(this.$root, event);
  }
}
