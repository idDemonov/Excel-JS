import { Page } from '@/pages/Page';
import { createStore } from '@/redux/create-store';
import { reducer } from '@/redux/reducer';
import { initialState } from '@/redux/initial-state';
import { debounce, getStorage, setStorage, storageName } from '@core/utils';
import { Excel } from '@/components/excel/Excel';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { IDom, IExcelPage, TStore } from '@/interface';

export class ExcelPage extends Page implements IExcelPage {
  private excel: Excel | undefined;

  getRoot(): IDom {
    const params = this.params || Date.now().toString(); // Оставить только this.params

    const key = storageName(params);
    const state = getStorage(key);
    // console.log(state);
    // if (!isState(state)) {
    //   throw Error('Ошибка при получении state из localstorage');
    // }
    const store: TStore = createStore(reducer, initialState(state));
    store.subscribe(debounce((state): void => setStorage(key, state), 300));

    this.excel = new Excel({
      components: [Titlebar, Toolbar, Formula, Editor],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender(): void {
    this.isInitExcel('afterRender');
    this.excel?.init();
  }

  destroy(): void {
    this.isInitExcel('destroy');
    this.excel?.destroy();
  }

  private isInitExcel(str: string): void | never {
    if (!this.excel) {
      throw Error(`${str} вызван, но класс Excel не инициализирован`);
    }
  }
}
