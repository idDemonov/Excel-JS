import { createToolbar } from '@/components/toolbar/toolbar.template';
import { $ } from '@core/dom';
import { ExcelStateComponents } from '@core/Excel-state-components';

export class Toolbar extends ExcelStateComponents {
  static classes = ['excel__toolbar', 'toolbar'];

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value);
      const key = Object.keys(value)[0];

      this.$$notify('toolbar:style', value);

      this.setState({ [key]: value[key] });
    }
  }
}
