import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$container = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components.forEach(Component => {
      const $nativeElement = $.create('div', ...Component.classes);
      const component = new Component();

      $nativeElement.html(component.toHTML());
      $root.append($nativeElement);
    });

    return $root;
  }

  render() {
    this.$container.append(this.getRoot());
  }
}
