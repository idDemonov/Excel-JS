import { Page } from '@/pages/Page';
import { $ } from '@core/dom';
import { homescreenTemplate } from '@/pages/homescreen.template';

export class Homescreen extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'homescreen').html(homescreenTemplate(now));
  }
}
