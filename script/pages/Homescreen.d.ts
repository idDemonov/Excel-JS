import { Page } from '@/pages/Page';
import { IDom, IHomescreen } from '@/interface';
export declare class Homescreen extends Page implements IHomescreen {
    getRoot(): IDom;
    afterRender(): void;
    destroy(): void;
}
