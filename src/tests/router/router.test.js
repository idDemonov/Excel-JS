import { Router } from '@/router/Router';
import { Page } from '@/pages/Page';

class Homescreen extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'homescreen';
    return root;
  }
}
class Excel extends Page {}

describe('Router', () => {
  let $root = null;
  let router = null;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      homescreen: Homescreen,
      excel: Excel,
    });
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should return Homescreen page', () => {
    router.routerHandler();
    expect($root.innerHTML).toBe('<div>homescreen</div>');
  });
});
