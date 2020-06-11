import { isDefined, isEqual, keys } from '@core/utils';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { IStoreSubscriber, TState, TStore } from '@/interface';

export class StoreSubscriber implements IStoreSubscriber {
  private prevState: TState;
  private sub: { unsubscribe: () => void } | null;
  private store: TStore;
  constructor(store: TStore) {
    this.store = store;
    this.sub = null;
    this.prevState = {} as TState;
  }

  subscribeComponents(
    components: Array<Titlebar | Toolbar | Formula | Editor>
  ): void {
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe((state: TState): void => {
      keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.subscribe.includes(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore(): void {
    if (isDefined(this.sub)) this.sub.unsubscribe();
  }
}
