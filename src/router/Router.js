import { ActiveRoute } from '@/router/Active-route';
import { $ } from '@core/dom';

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector);
    this.routes = routes;

    this.routerHandler = this.routerHandler.bind(this);

    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.routerHandler);
    this.routerHandler();
  }

  routerHandler() {
    this.$placeholder.clear();
    if (this.page) {
      this.page.destroy();
    }

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.homescreen;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.routerHandler);
  }
}
