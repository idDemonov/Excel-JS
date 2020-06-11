import * as Actions from '@/redux/actions';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import { CallType, EventObserver, Events, Subscriber } from '@core/Event-observer';
export interface ITitlebar extends IExcelComponent {
    toHTML(): string;
    onInput(event: InputEvent): void;
    onClick(event: MouseEvent): void;
    storeChanged(): void;
}
export interface IToolbar extends IExcelStateComponents {
    prepare(): void;
    template: string;
    toHTML(): string;
    storeChanged(changes: Record<string, string>): void;
    onClick(event: Event): void;
}
export interface IFormula extends IExcelComponent {
    toHTML(): string;
    init(): void;
    storeChanged(changes: Record<string, unknown>): void;
    onInput({ target }: InputEvent): void;
    onKeydown(event: Event): void;
}
export interface IEditor extends IExcelComponent {
    toHTML(): string;
    prepare(): void;
    init(): void;
    resizeEditor(event: Event): Promise<void>;
    selectionCell($cell: IDom): void;
    updateTextInStore(value: string): void;
    onMousedown(event: MouseEvent): void;
    onKeydown(event: KeyboardEvent): void;
    onInput(event: InputEvent): void;
    storeChanged(): void;
}
export interface IExcel {
    init(): void;
    getRoot(): IDom;
    destroy(): void;
}
export declare type TStore = {
    dispatch(action: ActionsType): void;
    getState(): TState;
    subscribe(listener: (state: TState) => void): {
        unsubscribe: () => void;
    };
};
export declare type ExcelOptions = {
    components: Array<typeof Titlebar | typeof Toolbar | typeof Formula | typeof Editor>;
    store: TStore;
};
export interface IExcelComponent {
    prepare(): void;
    toHTML(): void;
    init(): void;
    destroy(): void;
    $dispatch(action: ActionsType): void;
    $dispatch(action: ActionsType): void;
    $$attach(event: string, fn: () => void): void;
    $$notify(event: string, ...args: unknown[]): void;
}
export interface TOptionsElComp extends TComponentsOptions {
    name: string;
    subscribe?: string[];
}
export interface TComponentsOptions {
    observer: EventObserver;
    store: TStore;
}
export interface IExcelStateComponents extends IExcelComponent {
    template: string;
    initState(initialState: TStylesCell): void;
    setState(newState: TStylesCell): void;
}
export interface IDom {
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
    dataset: DOMStringMap;
    css(styles: Partial<CSSStyleDeclaration>): void;
    getStyles<T extends keyof CSSStyleDeclaration>(styles: readonly T[]): Pick<CSSStyleDeclaration, T>;
    attr(name: string, value: string): this;
}
export interface IExcelPage {
    getRoot(): IDom;
    afterRender(): void;
    destroy(): void;
}
export interface IHomescreen {
    getRoot(): IDom;
    afterRender(): void;
    destroy(): void;
}
export interface IRouter {
    init(): void;
    routerHandler(): void;
    destroy(): void;
}
export interface IEventObserver {
    attach<T>(event: Events, subscriber: (par: CallType<T>) => void): () => void;
    detach(event: Events, subscriber: Subscriber): void;
    notify<T>(event: Events, evt?: CallType<T>): void;
}
export interface IStoreSubscriber {
    subscribeComponents(components: Array<Titlebar | Toolbar | Formula | Editor>): void;
    unsubscribeFromStore(): void;
}
export declare type IRootOptions = {
    homescreen: new (params: string) => IHomescreen;
    excel: new (params: string) => IExcelPage;
};
export declare type Iid = {
    row: number;
    col: number;
};
export declare type PayloadEditorResize = {
    value: number;
    type: string;
    id: string;
};
export declare type PayloadChangeText = {
    value: string;
    id: string;
};
export declare type PayloadApplyStyle = {
    value: {
        [key in keyof TStylesCell]?: string;
    };
    ids: string[];
};
declare type InferValueType<T> = T extends {
    [key: string]: infer U;
} ? U : never;
export declare type ActionsType = ReturnType<InferValueType<typeof Actions>>;
export declare type TReducer = (state: TState, action: ActionsType) => TState;
export declare type TStylesCell = {
    readonly textAlign: string;
    readonly fontWeight: string;
    readonly textDecoration: string;
    readonly fontStyle: string;
};
export declare type TState = {
    readonly title: string;
    readonly colState: Partial<Record<string, string>>;
    readonly rowState: Partial<Record<string, string>>;
    readonly dataState: Partial<Record<string, string>>;
    readonly stylesState: {
        [key: string]: {
            [key in keyof TStylesCell]?: string;
        };
    };
    readonly currentText: string;
    readonly currentStyle: TStylesCell;
    readonly lastModifiedDate: string;
};
export {};
