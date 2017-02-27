import Builder from '../../../Contracts/Builders/Builder';
import DecoratorConstructorAction from '../../../Core/Components/Types/Actions/DecoratorConstructorAction';
import DecoratorMethodAction from '../Types/Actions/DecoratorMethodAction';
import { MainController } from '../Controllers/MainController';
export declare abstract class DecoratorBuilder extends Builder {
    private _params;
    readonly params: any[];
    constructor();
    private constructorAction;
    private methodAction;
    Construct: DecoratorConstructorAction;
    Method: DecoratorMethodAction;
    abstract onConstructor<T extends MainController>(_class: {
        new (): T;
    }): void;
    abstract onMethod<T extends MainController>(target: T, key: string, pd: PropertyDescriptor | undefined): PropertyDescriptor;
    build(...args: any[]): Function;
}
