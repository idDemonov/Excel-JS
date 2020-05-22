import { ExcelComponent } from '@core/Excel-component';

export class Formula extends ExcelComponent {
  static classes = ['excel__formula', 'formula'];

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    return `
       <div class="formula__label">fx</div>
       <div class="formula__input" contenteditable spellcheck="false"></div>
   `;
  }

  onInput(event) {}

  onClick() {}
}
