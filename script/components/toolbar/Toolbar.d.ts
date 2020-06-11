import { ExcelStateComponents } from '@core/Excel-state-components';
import { IDom, IToolbar, TComponentsOptions } from '@/interface';
export declare class Toolbar extends ExcelStateComponents implements IToolbar {
    static classes: string[];
    constructor($root: IDom, options: TComponentsOptions);
    init(): void;
    prepare(): void;
    get template(): string;
    toHTML(): string;
    storeChanged(changes: Record<string, unknown>): void;
    onClick: (event: MouseEvent) => void;
    destroy(): void;
}
