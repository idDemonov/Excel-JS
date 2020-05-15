import './style/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';

const excel = new Excel('#app', {
  component: [Titlebar, Toolbar, Formula, Editor],
});

excel.render();
