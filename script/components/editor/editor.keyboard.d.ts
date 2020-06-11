import { EditorSelection } from '@/components/editor/Editor-selection';
import { IDom, Iid } from '@/interface';
export declare const keyboardHandler: (event: KeyboardEvent, selection: EditorSelection, $root: IDom) => IDom | void;
export declare const nextSelector: (key: string, { col, row }: Iid) => string;
