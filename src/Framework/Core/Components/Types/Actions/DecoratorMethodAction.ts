import Action from "../../Types/Actions/Action";




export namespace Framework.Core.Types.Actions {
    /**
     * Method should take in the prototype
     */

    export type DecoratorMethodAction = <T extends Function>(target: T, key: string, value: PropertyDescriptor | undefined) => PropertyDescriptor;
}

export type DecoratorMethodAction = Framework.Core.Types.Actions.DecoratorMethodAction;

export default DecoratorMethodAction;