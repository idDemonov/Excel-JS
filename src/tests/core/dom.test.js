import { $, Dom } from '@core/dom';

describe('create-store', () => {
  let node = null;

  beforeEach(() => {
    node = $.create('div', 'test');
  });

  test('should be wrapped by class Dom', () => {
    expect(node).toBeInstanceOf(Dom);
  });

  test('should have methods Dom', () => {
    expect(node.html).toBeDefined();
    expect(node.text).toBeDefined();
    expect(node.on).toBeDefined();
    expect(node.css).toBeDefined();
  });
});
