import { ControllerOptions } from './ControllerOptions';
import { MainController } from '../MainController';
export declare class ControllerMethodOptions<T extends MainController> extends ControllerOptions<T> {
    constructor(klass: {
        new (): T;
    }, name: string);
    method_type: string;
    method_name: string;
    method_path: string;
}
