import { ExcelComponent } from '@core/Excel-component';
import { IDom, IEditor, TComponentsOptions } from '@/interface';
export declare class Editor extends ExcelComponent implements IEditor {
    static classes: string[];
    private selection;
    constructor($root: IDom, options: TComponentsOptions);
    toHTML(): string;
    prepare(): void;
    init(): void;
    resizeEditor(event: Event): Promise<void>;
    selectionCell($cell: IDom): void;
    updateTextInStore(value: string): void;
    onMousedown: (event: MouseEvent) => void;
    onKeydown: (event: KeyboardEvent) => void;
    onInput: (event: Event) => void;
    storeChanged(): void;
    destroy(): void;
}
