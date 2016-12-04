import { AppGetter } from './AppGetter';
export declare class Feature extends AppGetter {
    constructor();
    private convert(f);
    enable(f: string): this;
    enabled(f: string): boolean;
    disable(f: string): this;
    disabled(f: string): boolean;
    on(...args: any[]): any;
    get(name: string, orMe: any): any;
    set(name: string, value: any): void;
}
