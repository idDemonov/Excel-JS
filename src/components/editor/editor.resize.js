import { $ } from '@core/dom';

export const resizeHandler = ($root, event) => {
  event.preventDefault(); // Убрать выделение

  const $resize = $(event.target);
  const $parent = $resize.closest('[data-type="resize"]');
  const coords = $parent.getCoords();
  const type = $resize.dataset.resize;

  const sideProp = type === 'col' ? 'bottom' : 'right';
  const cursor = type === 'col' ? 'w-resize' : 's-resize';
  let value;

  $resize.css({ opacity: 1, [sideProp]: '-5000px' });
  document.body.style.cursor = cursor;

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resize.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resize.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    document.body.style.cursor = null;

    if (type === 'col') {
      $parent.css({ width: value + 'px' });
      $root
        .findAll(`[data-col="${$parent.dataset.col}"]`)
        .forEach((el) => (el.style.width = value + 'px'));
    } else {
      $parent.css({ height: value + 'px' });
    }

    $resize.css({ opacity: 0, bottom: 0, right: 0 });
  };
};
