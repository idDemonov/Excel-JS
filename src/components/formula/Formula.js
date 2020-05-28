import { ExcelComponent } from '@core/Excel-component';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static classes = ['excel__formula', 'formula'];

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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

    this.$$attach('editor:select', ($cell) => {
      this.$formula.text($cell.dataset.value);
    });
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput({ target }) {
    this.$$notify('formula:input', $(target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    this.$$notify('formula:enter');
  }
}
