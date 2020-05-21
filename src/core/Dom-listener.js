import { capitalizeFirstLetter } from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('Не задан контейнерный компонент. DomListener');
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        // свойство name берётся из класса ExcelComponent
        throw new Error(`Метод ${method}, не найден у компонента ${this.name}`);
      }

      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.removeEvent(listener, this[method]);
    });
  }
}
// click = onClick
function getMethodName(eventName) {
  return 'on' + capitalizeFirstLetter(eventName);
}
