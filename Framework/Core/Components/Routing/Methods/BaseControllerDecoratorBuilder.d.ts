import { DecoratorBuilder } from '../../Decorators/DecoratorBuilder';
import { MainController } from '../../Controllers/MainController';
import { ControllerMethodOptions } from '../../Controllers/Options/ControllerMethodOptions';
import ControllerOptions from '../../Controllers/Options/ControllerOptions';
export declare abstract class BaseControllerDecoratorBuilder extends DecoratorBuilder {
    protected getControllerOptions<T extends MainController>(c: {
        new (): T;
    }): ControllerOptions<T>;
    protected getMethodOption<T extends MainController>(constructor: {
        new (): T;
    }, name: string): ControllerMethodOptions<T>;
}
