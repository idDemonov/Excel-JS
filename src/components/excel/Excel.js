import { $ } from '@core/dom';
import { EventObserver } from '@core/Observer';
import { StoreSubscriber } from '@core/Store-subscriber';

export class Excel {
  constructor(selector, options) {
    this.$container = $(selector);
    this.components = options.components || [];
    this.observer = new EventObserver();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    // Создать контейнер для всех компонентов
    const $root = $.create('div', 'excel');

    const componentsOptions = {
      observer: this.observer,
      store: this.store,
    };

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

    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
