import { IDom, Iid } from '@/interface';

export class Dom implements IDom {
  private readonly $nativeElement: HTMLElement;

  constructor(node: HTMLElement) {
    this.$nativeElement = node;
  }

  html(html: string): this {
    this.$nativeElement.innerHTML = html;
    return this;
  }

  text(text?: string): string | this {
    if (typeof text !== 'undefined') {
      this.$nativeElement.textContent = text;
      return this;
    }

    if (this.$nativeElement instanceof HTMLInputElement) {
      return this.$nativeElement.value.trim();
    }
    const textRet:
      | string
      | undefined = this.$nativeElement?.textContent?.trim();
    return textRet || '';
  }

  clear(): this {
    this.html('');
    return this;
  }

  on<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  removeEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  append(node: IDom): this {
    if (node instanceof Dom) {
      const el: HTMLElement = node.$nativeElement;
      this.$nativeElement.append(el);
      return this;
    }

    this.$nativeElement.append((node as unknown) as string); // WTF?
    return this;
  }

  getCoords(): DOMRect {
    return this.$nativeElement.getBoundingClientRect();
  }

  closest(selector: string): IDom {
    const node: HTMLElement | null = this.$nativeElement.closest(selector);
    if (node === null) {
      throw Error(
        `Родительский Dom элемент по селектору ${selector}, не найден`
      );
    }
    return $(node);
  }

  find(selector: string): IDom {
    const node: HTMLElement | null = this.$nativeElement.querySelector(
      selector
    );
    if (node === null) {
      throw Error(`Dom элемент по селектору ${selector}, не найден`);
    }
    return $(node);
  }

  findAll(selector: string): HTMLDivElement[] {
    return Array.from(this.$nativeElement.querySelectorAll(selector));
  }

  addClass(name: string): this {
    this.$nativeElement.classList.add(name);
    return this;
  }

  removeClass(name: string): this {
    this.$nativeElement.classList.remove(name);
    return this;
  }

  focus(): this {
    const range: Range = document.createRange();
    range.selectNodeContents(this.$nativeElement);
    range.collapse(false);

    const sel: Selection | null = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    return this;
  }

  idCell(): Iid {
    const parsed = this.id().split(':');
    return {
      row: +parsed[0],
      col: +parsed[1],
    };
  }

  id(): string {
    if (this.dataset.id) {
      return this.dataset.id;
    } else {
      throw Error(`У элемента ${this} не найден id в data атрибуте`);
    }
  }

  get dataset(): DOMStringMap {
    return this.$nativeElement.dataset;
  }

  css(styles: Partial<CSSStyleDeclaration>): this {
    Object.assign(this.$nativeElement.style, styles);
    return this;
  }

  getStyles<T extends keyof CSSStyleDeclaration>(
    styles: readonly T[]
  ): Pick<CSSStyleDeclaration, T> {
    return styles.reduce((res, style) => {
      res[style] = this.$nativeElement.style[style];
      return res;
    }, {} as Pick<CSSStyleDeclaration, T>);
  }

  attr(name: string, value: string): this {
    this.$nativeElement.setAttribute(name, value);
    return this;
  }
}

export const $ = (s: HTMLElement): IDom => new Dom(s);

$.create = (
  tagName: string,
  className?: string,
  ...classes: string[]
): IDom => {
  const el = document.createElement(tagName);
  if (className) el.classList.add(className, ...classes);
  return $(el);
};

$.findDom = (selector: string): IDom => {
  const node: HTMLElement | null = document.querySelector(selector);
  if (node === null) throw Error(`Элемент по селектору ${selector}, не найден`);
  return $(node);
};
