import { RouterPath } from '@/router/Router-path';
import { $ } from '@core/Dom';
import {
  IDom,
  IExcelPage,
  IHomescreen,
  IRootOptions,
  IRouter,
} from '@/interface';

export class Router implements IRouter {
  private routes: IRootOptions;
  private $placeholder: IDom;
  private page: null | IHomescreen | IExcelPage;

  constructor(selector: string, routes: IRootOptions) {
    this.$placeholder = $.findDom(selector);
    this.routes = routes;

    this.routerHandler = this.routerHandler.bind(this);
    this.page = null;
    this.init();
  }

  init(): void {
    window.addEventListener('hashchange', this.routerHandler);
    this.routerHandler();
  }

  routerHandler(): void {
    this.$placeholder.clear();
    if (this.page) this.page.destroy();

    const Page = RouterPath.path.includes('excel')
      ? this.routes.excel
      : this.routes.homescreen;

    this.page = new Page(RouterPath.param);

    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy(): void {
    window.removeEventListener('hashchange', this.routerHandler);
  }
}
