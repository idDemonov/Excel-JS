import { ExcelComponent } from '@core/Excel-component';
import { $ } from '@core/Dom';
import * as actions from '@/redux/actions';
import { RouterPath } from '@/router/Router-path';
import { IDom, ITitlebar, TComponentsOptions } from '@/interface';

export class Titlebar extends ExcelComponent implements ITitlebar {
  static classes: string[] = ['excel__titlebar', 'titlebar'];

  constructor($root: IDom, options: TComponentsOptions) {
    super($root, {
      name: 'Titlebar',
      ...options,
    });
  }

  init(): void {
    this.$root.on('click', this.onClick);
    this.$root.on('input', this.onInput);
  }

  toHTML(): string {
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

  onInput = (event: Event): void => {
    if (event.target instanceof HTMLElement) {
      const $target = $(event.target);
      this.$dispatch(actions.changeTitle($target.text() as string));
    }
  };

  onClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLElement) {
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
  };

  storeChanged(): void {} // Для подписки на изменения

  destroy(): void {
    super.destroy();

    this.$root.removeEvent('click', this.onClick);
    this.$root.removeEvent('input', this.onInput);
  }
}
