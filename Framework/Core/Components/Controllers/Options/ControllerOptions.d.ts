import { MainController } from '../MainController';
export declare class ControllerOptions<T extends MainController> {
    protected _class: {
        new (): T;
    };
    readonly klass: new () => T;
    private _route;
    route: string;
    Settings: any;
    constructor(_class: {
        new (): T;
    });
}
export default ControllerOptions;
