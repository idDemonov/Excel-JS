export class EventObserver {
  constructor() {
    // Подписчики / Наблюдатели
    this.observers = {};
  }

  // Уведомление подписчиков
  notify(event, ...args) {
    if (this.observers[event]) {
      this.observers[event].forEach((subscriber) => subscriber(...args));
    }
  }

  // Подписаться на события
  attach(event, subscriber) {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(subscriber);

    // Вернуть функцию для отписки
    return () => this.detach(event, subscriber);
  }

  // Отписаться от событий
  detach(event, subscriber) {
    this.observers[event] = this.observers[event].filter((fn) => {
      return fn !== subscriber;
    });
  }
}
