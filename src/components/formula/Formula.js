import { ExcelComponent } from '@core/Excel-component';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static classes = ['excel__formula', 'formula'];

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
       <div class="formula__label">fx</div>
       <div class="formula__input" contenteditable spellcheck="false"></div>
   `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('.formula__input');

    this.$$subscribe('editor:select', ($cell) => {
      this.$formula.text($cell.text());
    });

    this.$$subscribe('editor:input', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  onInput({ target }) {
    this.$$dispatch('formula:input', $(target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    this.$$dispatch('formula:enter');
  }
}
