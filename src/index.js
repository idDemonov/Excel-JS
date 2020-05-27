import './style/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { createStore } from '@/redux/create-store';
import { rootReducer } from '@/redux/root-reducer';
import { storage, debounce } from '@core/utils';
import { initialState } from '@/redux/initial-state';

const store = createStore(rootReducer, initialState);

store.subscribe(debounce((state) => storage('excel-state', state), 300));

const excel = new Excel('#app', {
  components: [Titlebar, Toolbar, Formula, Editor],
  store,
});

excel.render();
