import { IDom, IEventObserver, TStylesCell } from '@/interface';
export declare class EventObserver implements IEventObserver {
    private readonly observers;
    constructor();
    attach<T>(event: Events, subscriber: (par: CallType<T>) => void): () => void;
    detach(event: Events, subscriber: Subscriber): void;
    notify<T>(event: Events, evt?: CallType<T>): void;
}
export declare type Subscriber = () => void;
export declare type Events = 'formula:input' | 'formula:enter' | 'toolbar:style' | 'editor:select';
export declare type CallType<T> = T extends 'formula:input' ? string : T extends 'formula:enter' ? void : T extends 'toolbar:style' ? {
    [key in keyof TStylesCell]?: string;
} : T extends 'editor:select' ? IDom : never;
