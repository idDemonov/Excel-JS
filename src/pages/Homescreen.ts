import { Page } from '@/pages/Page';
import { $ } from '@core/Dom';
import { homescreenTemplate } from '@/pages/homescreen.template';
import { IDom, IHomescreen } from '@/interface';

export class Homescreen extends Page implements IHomescreen {
  getRoot(): IDom {
    const now = Date.now().toString();
    return $.create('div', 'homescreen').html(homescreenTemplate(now));
  }
  afterRender(): void {}

  destroy(): void {}
}
