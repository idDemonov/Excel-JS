import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';
import { matrix } from '@/components/editor/editor.selection';
import { keyboardHandler } from '@/components/editor/editor.keyboard';
import { $ } from '@core/dom';
import * as actions from '@/redux/actions';

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
    return createTable(25, this.store.getState());
  }

  init() {
    super.init();
    this.selection = new EditorSelection();
    this.selectionCell(this.$root.find('[data-id="0:0"]'));

    this.$$attach('formula:input', (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    this.$$attach('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  async resizeEditor(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.editorResize(data));
    } catch (e) {
      console.warn('Resize error:', e.message);
    }
  }

  selectionCell($cell) {
    this.selection.select($cell);
    this.$$notify('editor:select', $cell);
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeEditor(event);
    } else if (event.target.dataset.id) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) => {
          return this.$root.find(`[data-id="${id}"]`);
        });
        this.selection.selectGroup($cells);
      } else {
        this.selectionCell($target);
      }
    }
  }

  onKeydown(event) {
    const $select = keyboardHandler(event, this.selection, this.$root);
    if ($select) this.$$notify('editor:select', $select);
  }

  onInput(event) {
    const text = $(event.target).text();
    this.updateTextInStore(text);
  }
}
