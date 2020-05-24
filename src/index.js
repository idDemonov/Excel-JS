import './style/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { createStore } from '@/redux/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage } from '@core/utils';

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe((state) => storage('excel-state', state));

const excel = new Excel('#app', {
  components: [Titlebar, Toolbar, Formula, Editor],
  store,
});

excel.render();
