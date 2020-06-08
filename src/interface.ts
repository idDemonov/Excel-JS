import * as Actions from '@/redux/actions';
import { Titlebar } from '@/components/titlebar/Titlebar';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Editor } from '@/components/editor/Editor';
import {
  CallType,
  EventObserver,
  Events,
  Subscriber,
} from '@core/Event-observer';

// Titlebar - класс, отвечает за название, удаление и выход
export interface ITitlebar extends IExcelComponent {
  toHTML(): string;
  onInput(event: InputEvent): void;
  onClick(event: MouseEvent): void;
  storeChanged(): void;
}

// Toolbar - класс, отвечает за стили ячеек
export interface IToolbar extends IExcelStateComponents {
  prepare(): void;
  template: string;
  toHTML(): string;
  storeChanged(changes: Record<string, string>): void;
  onClick(event: Event): void;
}

// Formula - класс, отвечает за формулу
export interface IFormula extends IExcelComponent {
  toHTML(): string;
  init(): void;
  storeChanged(changes: Record<string, unknown>): void;
  onInput({ target }: InputEvent): void;
  onKeydown(event: Event): void;
}

// Editor - класс, отвечает за таблицу
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

// Excel - класс, для инициализации Editor, Formula, Toolbar, Titlebar
export interface IExcel {
  init(): void;
  getRoot(): IDom;
  destroy(): void;
}

// Тип Store в Redux
export type TStore = {
  dispatch(action: ActionsType): void;
  getState(): TState;
  subscribe(listener: (state: TState) => void): { unsubscribe: () => void };
};

// Опции передаваемые в Excel
export type ExcelOptions = {
  components: Array<
    typeof Titlebar | typeof Toolbar | typeof Formula | typeof Editor
  >;
  store: TStore;
};

// ExcelComponent - класс, для управления состоянием Editor, Formula, Toolbar, Titlebar
// В нем сокрыта логика методов Observer и Redux
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

// Опции передаваемые в ExcelComponent
export interface TOptionsElComp extends TComponentsOptions {
  name: string;
  subscribe?: string[];
}

// Опции передаваемые в компоненты Editor | Titlebar | Toolbar | Formula
export interface TComponentsOptions {
  observer: EventObserver;
  store: TStore;
}

// ExcelStateComponents - класс, для управления состоянием Toolbar
// А именно управляет стилями в state
export interface IExcelStateComponents extends IExcelComponent {
  template: string;
  initState(initialState: TStylesCell): void;
  setState(newState: TStylesCell): void;
}

// Dom - класс обёртка над Node узлами для удобного управления
export interface IDom {
  html(html: string): this;
  text(text?: string): string | this;
  clear(): this;
  on<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void;
  removeEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void
  ): void;
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
  getStyles<T extends keyof CSSStyleDeclaration>(
    styles: readonly T[]
  ): Pick<CSSStyleDeclaration, T>;
  attr(name: string, value: string): this;
}

// Page - абстрактный класс в котором хранятся параметр текущего url
// По которому строиться уникальный url для каждой Excel таблицы
// export interface IPage {}

// ExcelPage - класс, страница excel
export interface IExcelPage {
  getRoot(): IDom;
  afterRender(): void;
  destroy(): void;
}

// Homescreen - класс, страница Homescreen
export interface IHomescreen {
  getRoot(): IDom;
  afterRender(): void;
  destroy(): void;
}

// Router - класс для управления страницы в зависимости от текущего url
export interface IRouter {
  init(): void;
  routerHandler(): void;
  destroy(): void;
}

// RouterPath - вспомогательный класс, для получения и записи url
// interface IRouterPath {}

// EventObserver - класс реализует паттерн Наблюдатель
export interface IEventObserver {
  attach<T>(event: Events, subscriber: (par: CallType<T>) => void): () => void;
  detach(event: Events, subscriber: Subscriber): void;
  notify<T>(event: Events, evt?: CallType<T>): void;
}

// StoreSubscriber - класс реализует подписку на store
export interface IStoreSubscriber {
  subscribeComponents(
    components: Array<Titlebar | Toolbar | Formula | Editor>
  ): void;
  unsubscribeFromStore(): void;
}

// Указывает тип получаемых страниц в класс Router
export type IRootOptions = {
  homescreen: new (params: string) => IHomescreen;
  excel: new (params: string) => IExcelPage;
};

export type Iid = {
  row: number;
  col: number;
};

// Данные передаваемые в action resizeHandler
export type PayloadEditorResize = {
  value: number;
  type: string;
  id: string;
};

// Данные передаваемые в action changeText
export type PayloadChangeText = {
  value: string;
  id: string;
};

// Данные передаваемые в action applyStyle
export type PayloadApplyStyle = {
  value: { [key in keyof TStylesCell]?: string };
  ids: string[];
};

// Определяет тип возвращаемый объекта
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;

// Тип Actions
export type ActionsType = ReturnType<InferValueType<typeof Actions>>;

// Тип функции Reducer
export type TReducer = (state: TState, action: ActionsType) => TState;

// Основные стили которые можно изменить в ячейках
export type TStylesCell = {
  readonly textAlign: string;
  readonly fontWeight: string;
  readonly textDecoration: string;
  readonly fontStyle: string;
};

// Состояние приложения
export type TState = {
  readonly title: string;
  readonly colState: Partial<Record<string, string>>;
  readonly rowState: Partial<Record<string, string>>;
  readonly dataState: Partial<Record<string, string>>;
  readonly stylesState: {
    [key: string]: { [key in keyof TStylesCell]?: string };
  };
  readonly currentText: string;
  readonly currentStyle: TStylesCell;
  readonly lastModifiedDate: string;
};
