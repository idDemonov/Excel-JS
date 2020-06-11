import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/Dom';
import { ExcelStateComponents } from '@core/Excel-state-components';
import { IDom, IToolbar, TComponentsOptions, TStylesCell } from '@/interface';
import { defaultStyles } from '@/redux/initial-state';

export class Toolbar extends ExcelStateComponents implements IToolbar {
  static classes: string[] = ['excel__toolbar', 'toolbar'];

  constructor($root: IDom, options: TComponentsOptions) {
    super($root, {
      name: 'Toolbar',
      subscribe: ['currentStyle'],
      ...options,
    });
  }

  init(): void {
    this.$root.on('click', this.onClick);
  }

  prepare(): void {
    this.initState(defaultStyles);
  }

  get template(): string {
    if (!this.state) {
      throw Error(
        'Состояние стилей используется раньше чем инициализированы компоненты'
      );
    }
    return createToolbar(this.state);
  }

  toHTML(): string {
    return this.template;
  }

  storeChanged(changes: Record<string, unknown>): void {
    this.setState(changes.currentStyle as TStylesCell);
  }

  onClick = (event: MouseEvent): void => {
    if (event.target instanceof HTMLElement) {
      const $target = $(event.target);

      if ($target.dataset.type === 'button') {
        if (!$target.dataset.value) throw Error('Не прочитан value при клике');
        const value = JSON.parse($target.dataset.value);
        this.$$notify('toolbar:style', value);
      }
    }
  };

  destroy(): void {
    super.destroy();
    this.$root.removeEvent('click', this.onClick);
  }
}
