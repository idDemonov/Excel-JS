import { PayloadApplyStyle, PayloadChangeText, PayloadEditorResize, TState, TStylesCell } from '@/interface';
export declare const handlerEditorResize: (state: TState, payload: PayloadEditorResize) => TState;
export declare const handlerChangeText: (state: TState, payload: PayloadChangeText) => TState;
export declare const handlerChangeStyles: (state: TState, payload: TStylesCell) => TState;
export declare const handlerApplyStyle: (state: TState, payload: PayloadApplyStyle) => TState;
export declare const handlerChangeTitle: (state: TState, payload: string) => TState;
export declare const handlerUpdateDate: (state: TState) => TState;
