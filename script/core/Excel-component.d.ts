import { ActionsType, IDom, IExcelComponent, TOptionsElComp, TStore } from '@/interface';
import { Events, CallType } from '@core/Event-observer';
export declare class ExcelComponent implements IExcelComponent {
    store: TStore;
    subscribe: string[];
    private name;
    private observer;
    private unsubscribers;
    $root: IDom;
    constructor($root: IDom, options: TOptionsElComp);
    prepare(): void;
    toHTML(): void;
    init(): void;
    destroy(): void;
    $dispatch(action: ActionsType): void;
    $$attach<T>(event: Events, fn: (par: CallType<T>) => void): void;
    $$notify<T>(event: Events, evt?: CallType<T>): void;
}
