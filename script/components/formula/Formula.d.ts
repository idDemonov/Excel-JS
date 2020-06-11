import { ExcelComponent } from '@core/Excel-component';
import { IDom, IFormula, TComponentsOptions } from '@/interface';
export declare class Formula extends ExcelComponent implements IFormula {
    static classes: string[];
    private $formula;
    constructor($root: IDom, options: TComponentsOptions);
    toHTML(): string;
    init(): void;
    storeChanged(changes: Record<string, unknown>): void;
    onInput: ({ target }: Event) => void;
    onKeydown: (event: KeyboardEvent) => void;
    destroy(): void;
}
