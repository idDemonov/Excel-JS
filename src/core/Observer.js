export class EventObserver {
  constructor() {
    // Подписчики / Наблюдатели
    this.observers = {};
  }

  // Уведомление подписчиков
  dispatch(event, ...args) {
    if (this.observers[event]) {
      this.observers[event].forEach((subscriber) => subscriber(...args));
    }
  }

  // Подписаться на события
  subscribe(event, subscriber) {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(subscriber);

    // Вернуть функцию для отписки
    return () => this.unsubscribe(event, subscriber);
  }

  // Отписаться от событий
  unsubscribe(event, subscriber) {
    this.observers[event] = this.observers[event].filter((fn) => {
      return fn !== subscriber;
    });
  }
}
