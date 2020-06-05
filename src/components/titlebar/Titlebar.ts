import { ExcelComponent } from '@core/Excel-component';
import { $, Dom } from '@core/dom';
import * as actions from '@/redux/actions';
import { RouterPath } from '@/router/Router-path';

export class Titlebar extends ExcelComponent {
  static classes = ['excel__titlebar', 'titlebar'];

  protected constructor($root: Dom, options) {
    super($root, {
      name: 'Titlebar',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title;
    return `
      <input type="text" class="titlebar__name" value="${title}" />
      
      <div class="titlebar__controls">
        <button class="button" data-button="remove">
          <span class="material-icons" data-button="remove">
            delete_outline
          </span>
        </button>
        <button class="button" data-button="exit">
          <span class="material-icons" data-button="exit">
            exit_to_app
          </span>
        </button>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.dataset.button === 'remove') {
      const specify = confirm(
        'Вы точно хотите уничтожить таблицу?\nДанные таблицы будут потеряны!!!'
      );
      if (specify) {
        localStorage.removeItem('excel:' + RouterPath.param);
        RouterPath.path = '';
      }
    } else if ($target.dataset.button === 'exit') {
      RouterPath.path = '';
    }
  }
}
