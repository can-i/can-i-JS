import Builder from '../../../Contracts/Builders/Builder';
import DecoratorConstructorAction from '../../../Core/Components/Types/Actions/DecoratorConstructorAction';
import DecoratorMethodAction from '../Types/Actions/DecoratorMethodAction';




let genErr = new Error("General Failure")

export class DecoratorBuilder extends Builder {


    protected constructorAction: DecoratorConstructorAction;
    protected methodAction: DecoratorMethodAction;

    public set Construct(constructorAction: DecoratorConstructorAction) {
        this.constructorAction = constructorAction;
    }

    public set Method(methodAction: DecoratorMethodAction) {
        this.methodAction = methodAction;
    }

    build() {
        return (...args: any[]) => {
            if (args.length === 1) {
                return this.Construct(args[0]);
            } else if (args.length === 3) {
                const arg0 = (typeof args[0] === "object");
                const arg1 = (typeof args[1] === "string");

                if (arg0 && arg1) {
                    this.methodAction(args[0], args[1], args[2]);
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