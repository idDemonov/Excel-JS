import { ExcelComponent } from '@core/Excel-component';

export class Toolbar extends ExcelComponent {
  static classes = ['excel__toolbar', 'toolbar'];

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  onClick(event) {
    console.log('Click', event);
  }

  toHTML() {
    return `
      <button class="button">
        <span class="material-icons">
          format_align_left
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          format_align_justify
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          format_align_right
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          format_bold
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          format_underlined
        </span>
      </button>
      <button class="button">
        <span class="material-icons">
          format_italic
        </span>
      </button>
    `;
  }
}
