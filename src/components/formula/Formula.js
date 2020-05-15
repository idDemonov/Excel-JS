import { ExcelComponent } from '@core/Excel-component';

export class Formula extends ExcelComponent {
  static classes = ['header__formula', 'formula'];

  toHTML() {
    return `
            <div class="formula__label">fx</div>
            <div
              class="formula__input"
              contenteditable
              spellcheck="false"
            ></div>
          `;
  }
}
