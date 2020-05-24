import { $ } from '@core/dom';
import { EventObserver } from '@core/Observer';

export class Excel {
  constructor(selector, options) {
    this.$container = $(selector);
    this.components = options.components || [];
    this.observer = new EventObserver();
  }

  getRoot() {
    // Создать контейнер для всех компонентов
    const $root = $.create('div', 'excel');

    const componentsOptions = { observer: this.observer };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', ...Component.classes);
      const component = new Component($el, componentsOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$container.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
