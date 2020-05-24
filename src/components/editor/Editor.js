import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';
import { handlerSelection } from '@/components/editor/editor.selection';
import { keyboardHandler } from '@/components/editor/editor.keyboard';
import { $ } from '@core/dom';

export class Editor extends ExcelComponent {
  static classes = ['excel__editor', 'editor'];

  constructor($root, options) {
    super($root, {
      name: 'Editor',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
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
    this.$$notify('editor:select', $cell);

    this.$$subscribe('formula:input', (text) =>
      this.selection.current.text(text)
    );

    this.$$subscribe('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      resizeHandler(this.$root, event);
    } else if (event.target.dataset.id) {
      const $select = handlerSelection(this.$root, this.selection, event);
      this.$$notify('editor:input', $select);
    }
  }

  onKeydown(event) {
    const $next = keyboardHandler(event, this.selection, this.$root);
    if ($next) this.$$notify('editor:select', $next);
  }

  onInput(event) {
    this.$$notify('editor:input', $(event.target));
  }
}
