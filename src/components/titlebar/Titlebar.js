import { ExcelComponent } from '@core/Excel-component';

export class Titlebar extends ExcelComponent {
  static classes = ['header__titlebar', 'titlebar'];

  toHTML() {
    return `

            <input type="text" class="titlebar__name" value="Новая таблица" />

            <div class="titlebar__controls">
              <button class="button">
                <span class="material-icons">
                  delete_outline
                </span>
              </button>
              <button class="button">
                <span class="material-icons">
                  exit_to_app
                </span>
              </button>
            </div>
`;
  }
}
