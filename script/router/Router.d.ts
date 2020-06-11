import { IRootOptions, IRouter } from '@/interface';
export declare class Router implements IRouter {
    private routes;
    private $placeholder;
    private page;
    constructor(selector: string, routes: IRootOptions);
    init(): void;
    routerHandler(): void;
    destroy(): void;
}
