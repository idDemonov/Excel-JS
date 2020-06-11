import { Page } from '@/pages/Page';
import { IDom, IExcelPage } from '@/interface';
export declare class ExcelPage extends Page implements IExcelPage {
    private excel;
    getRoot(): IDom;
    afterRender(): void;
    destroy(): void;
    private isInitExcel;
}
