import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$container = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components.forEach(Component => {
      const $el = $.create('div', ...Component.classes);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });
    return $root;
  }

  render() {
    this.$container.append(this.getRoot());
  }
}
