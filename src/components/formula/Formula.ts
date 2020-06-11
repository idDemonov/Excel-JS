import { ExcelComponent } from '@core/Excel-component';
import { $ } from '@core/Dom';
import { IDom, IFormula, TComponentsOptions } from '@/interface';

export class Formula extends ExcelComponent implements IFormula {
  static classes: string[] = ['excel__formula', 'formula'];
  private $formula: IDom | undefined;

  constructor($root: IDom, options: TComponentsOptions) {
    super($root, {
      name: 'Formula',
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML(): string {
    return `
       <div class="formula__label">fx</div>
       <div class="formula__input" contenteditable spellcheck="false"></div>
   `;
  }

  init(): void {
    this.$root.on('keydown', this.onKeydown);
    this.$root.on('input', this.onInput);

    this.$formula = this.$root.find('.formula__input');

    this.$$attach<'editor:select'>('editor:select', ($cell) => {
      if ($cell.dataset.value) this.$formula?.text($cell.dataset.value);
      else this.$formula?.text($cell.text() as string);
    });
  }

  storeChanged(changes: Record<string, unknown>): void {
    this.$formula?.text(changes.currentText as string);
  }
  // Не InputEvent т.к. это div
  onInput = ({ target }: Event): void => {
    if (target instanceof HTMLElement) {
      const text = $(target).text();
      if (typeof text === 'string') {
        this.$$notify<'formula:input'>('formula:input', text);
      }
    }
  };

  onKeydown = (event: KeyboardEvent): void => {
    const keys = ['Enter', 'Tab'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    this.$$notify('formula:enter');
  };

  destroy(): void {
    super.destroy();

    this.$root.removeEvent('keydown', this.onKeydown);
    this.$root.removeEvent('input', this.onInput);
  }
}
