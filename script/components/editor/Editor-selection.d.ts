import { IDom } from '@/interface';
export declare class EditorSelection {
    private group;
    current: IDom | null;
    constructor();
    select($el: IDom): void;
    selectGroup($group: IDom[]): void;
    clear(): void;
    applyStyle(style: {
        [key: string]: string | undefined;
    }): void;
    get selectedIds(): string[];
}
