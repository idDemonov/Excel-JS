import { ExcelComponent } from '@core/Excel-component';

export class Formula extends ExcelComponent {
  static classes = ['excel__formula', 'formula'];

  toHTML() {
    return `
       <div class="formula__label">fx</div>
       <div class="formula__input" contenteditable spellcheck="false"></div>
   `;
  }
}
