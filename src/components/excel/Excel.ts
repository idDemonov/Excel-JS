import { $ } from '@core/Dom';
import { EventObserver } from '@core/Event-observer';
import { StoreSubscriber } from '@core/Store-subscriber';
import * as actions from '@/redux/actions';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import {
  ExcelOptions,
  IDom,
  IExcel,
  IStoreSubscriber,
  TComponentsOptions,
  TStore,
} from '@/interface';

export class Excel implements IExcel {
  private readonly components: Array<
    typeof Titlebar | typeof Toolbar | typeof Formula | typeof Editor
  >;
  private readonly observer: EventObserver;
  private readonly store: TStore;
  private subscriber: IStoreSubscriber;
  private instComp: Array<Titlebar | Toolbar | Formula | Editor> | undefined;

  constructor(options: ExcelOptions) {
    this.components = options.components;
    this.observer = new EventObserver();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  init(): void {
    if (!this.instComp) throw Error('Компоненты Excel не созданы');

    this.store.dispatch(actions.updateDate());
    this.subscriber.subscribeComponents(this.instComp);
    this.instComp.forEach((component) => component.init());
  }

  getRoot(): IDom {
    const $root = $.create('div', 'excel');

    const componentsOptions: TComponentsOptions = {
      observer: this.observer,
      store: this.store,
    };

    this.instComp = this.components.map((Component) => {
      const $el = $.create('div', ...Component.classes);
      const component = new Component($el, componentsOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  destroy(): void {
    if (!this.instComp) throw Error('Компоненты Excel не созданы');

    this.subscriber.unsubscribeFromStore();
    this.instComp.forEach((component) => component.destroy());
  }
}
