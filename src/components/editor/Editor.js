import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';
import { handlerSelection } from '@/components/editor/editor.selection';
import { keyboardHandler } from '@/components/editor/editor.keyboard';

export class Editor extends ExcelComponent {
  static classes = ['excel__editor', 'editor'];

  constructor($root) {
    super($root, {
      name: 'Editor',
      listeners: ['mousedown', 'keydown'],
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
      handlerSelection(this.$root, this.selection, event);
    }
  }

  onKeydown(event) {
    keyboardHandler(event, this.selection, this.$root);
  }
}
