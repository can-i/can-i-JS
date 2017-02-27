import { BaseControllerDecoratorBuilder } from './BaseControllerDecoratorBuilder';
import { MainController } from '../../Controllers/MainController';
import { Constructor } from '../../Types/Generic/Constructor';
import { MethodKey } from '../../Types/Routing/MethodKeys';
export declare class MethodControllerDecoratorBuilder<T extends MainController> extends BaseControllerDecoratorBuilder {
    private _type;
    readonly type: string;
    constructor(_type: MethodKey);
    onConstructor(construct: Constructor<T>): void;
    onMethod(target: {
        constructor: Constructor<T>;
    }, key: string, pd: PropertyDescriptor): PropertyDescriptor;
}
