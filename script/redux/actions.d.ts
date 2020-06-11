import { PayloadApplyStyle, PayloadChangeText, PayloadEditorResize, TStylesCell } from '@/interface';
export declare const editorResize: (payload: PayloadEditorResize) => {
    readonly type: "EDITOR_RESIZE";
    readonly payload: PayloadEditorResize;
};
export declare const changeText: (payload: PayloadChangeText) => {
    readonly type: "CHANGE_TEXT";
    readonly payload: PayloadChangeText;
};
export declare const changeStyles: (payload: TStylesCell) => {
    readonly type: "CHANGE_STYLES";
    readonly payload: TStylesCell;
};
export declare const applyStyle: (payload: PayloadApplyStyle) => {
    readonly type: "APPLY_STYLE";
    readonly payload: PayloadApplyStyle;
};
export declare const changeTitle: (payload: string) => {
    readonly type: "CHANGE_TITLE";
    readonly payload: string;
};
export declare const updateDate: () => {
    readonly type: "UPDATE_DATE";
};
export declare const initState: () => {
    readonly type: "INIT_STATE";
};
