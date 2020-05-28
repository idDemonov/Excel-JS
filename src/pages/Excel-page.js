import { Page } from '@/pages/Page';
import { createStore } from '@/redux/create-store';
import { rootReducer } from '@/redux/root-reducer';
import { initialState } from '@/redux/initial-state';
import { debounce, storage, storageName } from '@core/utils';
import { Excel } from '@/components/excel/Excel';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState);

    const key = storageName(this.params);
    store.subscribe(debounce((state) => storage(key, state), 300));

    this.excel = new Excel({
      components: [Titlebar, Toolbar, Formula, Editor],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
