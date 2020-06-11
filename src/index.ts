import './style/index.scss';
import { Router } from '@/router/Router';
import { Homescreen } from '@/pages/Homescreen';
import { ExcelPage } from '@/pages/Excel-page';

new Router('#app', {
  homescreen: Homescreen,
  excel: ExcelPage,
});
