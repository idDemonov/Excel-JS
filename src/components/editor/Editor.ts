import { ExcelComponent } from '@core/Excel-component';
import { createTable } from '@/components/editor/editor.template';
import { resizeHandler } from '@/components/editor/editor.resize';
import { EditorSelection } from '@/components/editor/Editor-selection';
import { keyboardHandler } from '@/components/editor/editor.keyboard';
import { $ } from '@core/Dom';
import * as actions from '@/redux/actions';
import { keys, matrix, parse } from '@core/utils';
import { IDom, IEditor, TComponentsOptions, TStylesCell } from '@/interface';
import { defaultStyles } from '@/redux/initial-state';

export class Editor extends ExcelComponent implements IEditor {
  static classes: string[] = ['excel__editor', 'editor'];
  private selection: EditorSelection | undefined;

  constructor($root: IDom, options: TComponentsOptions) {
    super($root, {
      name: 'Editor',
      ...options,
    });
  }

  toHTML(): string {
    return createTable(25, this.store.getState());
  }

  prepare(): void {
    this.selection = new EditorSelection();
  }

  init(): void {
    super.init();

    this.$root.on('mousedown', this.onMousedown);
    this.$root.on('keydown', this.onKeydown);
    this.$root.on('input', this.onInput);

    this.selectionCell(this.$root.find('[data-id="0:0"]'));

    this.$$attach<'formula:input'>('formula:input', (value: string): void => {
      this.selection?.current?.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });

    this.$$attach<'formula:enter'>('formula:enter', () => {
      this.selection?.current?.focus();
    });

    this.$$attach<'toolbar:style'>(
      'toolbar:style',
      (value: { [key in keyof TStylesCell]?: string }): void => {
        this.selection?.applyStyle(value);
        const ids = this.selection?.selectedIds;
        if (!ids) throw Error('В Editor не определенно свойство selection');

        this.$dispatch(
          actions.applyStyle({
            value,
            ids,
          })
        );
      }
    );
  }

  async resizeEditor(event: Event): Promise<void> {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.editorResize(data));
    } catch (e) {
      console.warn('Resize error:', e.message);
    }
  }

  selectionCell($cell: IDom): void {
    this.selection?.select($cell);

    $cell.attr('data-value', $cell.text() as string);
    this.$$notify<'editor:select'>('editor:select', $cell);

    const style = $cell.getStyles(keys(defaultStyles));
    this.$dispatch(actions.changeStyles(style));
  }

  updateTextInStore(value: string): void {
    const id = this.selection?.current?.id();
    if (!id) throw Error('Не удалось прочить id у текущего элемента');

    this.$dispatch(
      actions.changeText({
        id,
        value,
      })
    );
  }

  onMousedown = (event: MouseEvent): void => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.dataset.resize) {
      this.resizeEditor(event);
    } else if (event.target.dataset.id) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const current = this.selection?.current;
        if (!current) return;
        const $cells = matrix($target, current).map((id) => {
          return this.$root.find(`[data-id="${id}"]`);
        });
        this.selection?.selectGroup($cells);
      } else {
        this.selectionCell($target);
      }
    }
  };

  onKeydown = (event: KeyboardEvent): void => {
    const selection = this.selection;
    if (!selection) return;
    const $select = keyboardHandler(event, selection, this.$root);
    if ($select) this.$$notify<'editor:select'>('editor:select', $select);
  };

  onInput = (event: Event): void => {
    const text = $(event.target as HTMLInputElement).text();
    this.updateTextInStore(text as string);
  };

  storeChanged(): void {} // Для подписки на изменения

  destroy(): void {
    super.destroy();

    this.$root.removeEvent('mousedown', this.onMousedown);
    this.$root.removeEvent('keydown', this.onKeydown);
    this.$root.removeEvent('input', this.onInput);
  }
}
