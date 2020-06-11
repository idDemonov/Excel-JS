export declare abstract class Page {
    params: string;
    constructor(params: string);
    abstract afterRender(): void;
    abstract destroy(): void;
}
