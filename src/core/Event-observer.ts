import { IDom, IEventObserver, TStylesCell } from '@/interface';

export class EventObserver implements IEventObserver {
  private readonly observers: Record<Events, Subscriber[]> = {} as Record<
    Events,
    Subscriber[]
  >;
  constructor() {}

  attach<T>(event: Events, subscriber: (par: CallType<T>) => void): () => void {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(subscriber as () => void);

    // Вернуть функцию для отписки
    return () => this.detach(event, subscriber as () => void);
  }

  // Отписаться от событий
  detach(event: Events, subscriber: Subscriber): void {
    this.observers[event] = this.observers[event].filter((fn) => {
      return fn !== subscriber;
    });
  }

  // Уведомить подписчиков
  notify<T>(event: Events, evt?: CallType<T>): void {
    if (this.observers[event]) {
      this.observers[event].forEach((subscriber) => {
        (subscriber as EventSubscriber)(evt);
      });
    }
  }
}

type EventSubscriber = (...evt: unknown[]) => void;

export type Subscriber = () => void;

export type Events =
  | 'formula:input'
  | 'formula:enter'
  | 'toolbar:style'
  | 'editor:select';

export type CallType<T> = T extends 'formula:input'
  ? string
  : T extends 'formula:enter'
  ? void
  : T extends 'toolbar:style'
  ? { [key in keyof TStylesCell]?: string }
  : T extends 'editor:select'
  ? IDom
  : never;
