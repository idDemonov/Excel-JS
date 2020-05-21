import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$container = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    // Создать контейнер для всех компонентов
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      // Создать обертку с заданными классами
      const $el = $.create('div', ...Component.classes);
      // Передать обертку в компонент, для инициализации базовых настроек
      const component = new Component($el);
      // Передать разметку компонента в его обёртку
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
}
