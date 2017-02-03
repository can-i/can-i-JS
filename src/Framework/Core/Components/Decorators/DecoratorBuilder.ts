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

    async build() {
        return (...args: any[]) => {
            if (args.length === 1) {
                return this.Construct(args[0]);
            } else if (args.length === 3) {
                if ((args[0] instanceof Function) && (args[1] instanceof String)) {

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