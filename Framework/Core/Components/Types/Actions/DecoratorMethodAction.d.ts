export declare namespace Framework.Core.Types.Actions {
    /**
     * Method should take in the prototype
     */
    type DecoratorMethodAction = <T extends Function>(target: any, key: string, value: PropertyDescriptor | undefined) => PropertyDescriptor;
}
export declare type DecoratorMethodAction = Framework.Core.Types.Actions.DecoratorMethodAction;
export default DecoratorMethodAction;
