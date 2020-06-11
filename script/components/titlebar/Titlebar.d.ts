import { ExcelComponent } from '@core/Excel-component';
import { IDom, ITitlebar, TComponentsOptions } from '@/interface';
export declare class Titlebar extends ExcelComponent implements ITitlebar {
    static classes: string[];
    constructor($root: IDom, options: TComponentsOptions);
    init(): void;
    toHTML(): string;
    onInput: (event: Event) => void;
    onClick: (event: MouseEvent) => void;
    storeChanged(): void;
    destroy(): void;
}
