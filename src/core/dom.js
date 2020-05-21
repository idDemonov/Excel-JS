class Dom {
  constructor(selector) {
    this.$nativeElement =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }
    return this.$nativeElement.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  removeEvent(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) node = node.$nativeElement;
    this.$nativeElement.append(node);
    return this;
  }

  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }

  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  addClass(name) {
    this.$nativeElement.classList.add(name);
  }

  removeClass(name) {
    this.$nativeElement.classList.remove(name);
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.dataset.id;
  }

  get dataset() {
    return this.$nativeElement.dataset;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });
  }
}

export const $ = (s) => new Dom(s);

$.create = (tagName, className, ...classes) => {
  const el = document.createElement(tagName);
  if (className) el.classList.add(className, ...classes);
  return $(el);
};
