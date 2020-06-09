import {
  ActionsType,
  IDom,
  IExcelComponent,
  TOptionsElComp,
  TStore,
} from '@/interface';
import { EventObserver, Events, CallType } from '@core/Event-observer';

export class ExcelComponent implements IExcelComponent {
  store: TStore;
  subscribe: string[];
  private name: string;
  private observer: EventObserver;
  private unsubscribers: (() => void)[];
  $root: IDom;

  constructor($root: IDom, options: TOptionsElComp) {
    this.unsubscribers = [];
    this.name = options.name;
    this.store = options.store;
    this.observer = options.observer;
    this.subscribe = options.subscribe || [];
    this.$root = $root;

    this.prepare();
  }

  prepare(): void {}

  toHTML(): void {}

  init(): void {}

  destroy(): void {
    this.unsubscribers.forEach((unsubscriber) => unsubscriber());
  }

  // $ - Методы Redux
  $dispatch(action: ActionsType): void {
    this.store.dispatch(action);
  }

  // $$ - Методы Observer`а
  $$attach<T>(event: Events, fn: (par: CallType<T>) => void): void {
    const unsubscriber = this.observer.attach(event, fn);
    this.unsubscribers.push(unsubscriber);
  }

  $$notify<T>(event: Events, evt?: CallType<T>): void {
    if (evt) this.observer.notify(event, evt);
    else this.observer.notify(event);
  }
}
