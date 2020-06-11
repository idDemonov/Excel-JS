import { ExcelOptions, IDom, IExcel } from '@/interface';
export declare class Excel implements IExcel {
    private readonly components;
    private readonly observer;
    private readonly store;
    private subscriber;
    private instComp;
    constructor(options: ExcelOptions);
    init(): void;
    getRoot(): IDom;
    destroy(): void;
}
