import { DomListener } from '@core/Dom-listener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.subscribe = options.subscribe || [];
    this.observer = options.observer;
    this.store = options.store;
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

  // $ - Методы Redux
  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged(changes) {
    console.log(changes);
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
