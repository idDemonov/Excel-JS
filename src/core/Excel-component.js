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
  $$subscribe(event, fn) {
    const unsubscriber = this.observer.subscribe(event, fn);
    this.unsubscribers.push(unsubscriber);
  }

  $$dispatch(event, ...args) {
    this.observer.dispatch(event, ...args);
  }
}
