import { DomListener } from '@core/Dom-listener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.observer = options.observer;
    this.unsubscribers = [];
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscriber) => unsubscriber());
  }

  // $$ - Методы Observer`а
  $$attach(event, fn) {
    const unsubscriber = this.observer.attach(event, fn);
    this.unsubscribers.push(unsubscriber);
  }

  $$notify(event, ...args) {
    this.observer.notify(event, ...args);
  }
}
