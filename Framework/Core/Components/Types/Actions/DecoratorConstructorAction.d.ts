export declare namespace Framework.Core.Types.Actions {
    type DecoratorConstructorAction = <T extends Function>(_class: {
        new (): T;
    }) => T | void;
}
export declare type DecoratorConstructorAction = Framework.Core.Types.Actions.DecoratorConstructorAction;
export default DecoratorConstructorAction;
