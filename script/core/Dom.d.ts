import { IDom, Iid } from '@/interface';
export declare class Dom implements IDom {
    private readonly $nativeElement;
    constructor(node: HTMLElement);
    html(html: string): this;
    text(text?: string): string | this;
    clear(): this;
    on<K extends keyof HTMLElementEventMap>(eventType: K, callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void): void;
    removeEvent<K extends keyof HTMLElementEventMap>(eventType: K, callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void): void;
    append(node: IDom): this;
    getCoords(): DOMRect;
    closest(selector: string): IDom;
    find(selector: string): IDom;
    findAll(selector: string): HTMLDivElement[];
    addClass(name: string): this;
    removeClass(name: string): this;
    focus(): this;
    idCell(): Iid;
    id(): string;
    get dataset(): DOMStringMap;
    css(styles: Partial<CSSStyleDeclaration>): this;
    getStyles<T extends keyof CSSStyleDeclaration>(styles: readonly T[]): Pick<CSSStyleDeclaration, T>;
    attr(name: string, value: string): this;
}
export declare const $: {
    (s: HTMLElement): IDom;
    create(tagName: string, className?: string | undefined, ...classes: string[]): IDom;
    findDom(selector: string): IDom;
};
