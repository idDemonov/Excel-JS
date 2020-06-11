import { ExcelComponent } from '@core/Excel-component';
import { IDom, IExcelStateComponents, TOptionsElComp, TStylesCell } from '@/interface';
export declare class ExcelStateComponents extends ExcelComponent implements IExcelStateComponents {
    state: TStylesCell | undefined;
    constructor(...args: [IDom, TOptionsElComp]);
    get template(): string;
    initState(initialState: TStylesCell): void;
    setState(newState: TStylesCell): void;
}
