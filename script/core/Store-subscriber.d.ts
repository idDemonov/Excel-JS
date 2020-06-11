import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { IStoreSubscriber, TStore } from '@/interface';
export declare class StoreSubscriber implements IStoreSubscriber {
    private prevState;
    private sub;
    private store;
    constructor(store: TStore);
    subscribeComponents(components: Array<Titlebar | Toolbar | Formula | Editor>): void;
    unsubscribeFromStore(): void;
}
