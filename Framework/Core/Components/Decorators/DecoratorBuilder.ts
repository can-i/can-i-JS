import Builder from '../../../Contracts/Builders/Builder';
import DecoratorConstructorAction from '../../../Core/Components/Types/Actions/DecoratorConstructorAction';
import DecoratorMethodAction from '../Types/Actions/DecoratorMethodAction';
import { MainController } from '../Controllers/MainController';




let genErr = new Error("General Failure")

export abstract class DecoratorBuilder extends Builder {

    constructor(){
        super();
        this.Construct = this.onConstructor as DecoratorConstructorAction;
        this.Method = this.onMethod as DecoratorMethodAction;
    }

    private constructorAction: DecoratorConstructorAction;
    private methodAction: DecoratorMethodAction;


    public get Construct(){
        return this.constructorAction;
    }
    public set Construct(constructorAction: DecoratorConstructorAction) {
        this.constructorAction = constructorAction;
    }

    public set Method(methodAction: DecoratorMethodAction) {
        this.methodAction = methodAction;
    }

    public get Method(){
        return this.methodAction;
    }

    abstract onConstructor<T extends MainController>(_class:{new():T}):void;
    abstract onMethod<T extends MainController>(target:T,key:string,pd:PropertyDescriptor|undefined):PropertyDescriptor;

    build():Function {
        return (...args: any[]) => {
            if (args.length === 1) {
                return this.Construct(args[0]);
            } else if (args.length === 3) {
                const arg0 = (typeof args[0] === "object");
                const arg1 = (typeof args[1] === "string");

                if (arg0 && arg1) {
                    this.Method(args[0], args[1], args[2]);
                } else {
                    //error
                    throw genErr;
                }
            } else {
                //error
                throw genErr;
            }
        }
    }

}