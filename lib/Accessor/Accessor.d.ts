import { Controller } from "../Controller/Controller";
export declare type ControllerCreator = {
    new (): Controller;
};
export declare class Accessor {
    readonly id: number;
    constructor();
}
export declare class AccessorManager {
    private readonly controller_accessor;
    /**
     * This will allow the framework to access
     */
    private readonly root;
    GetControllerAccessor(Controller: ControllerCreator): ControllerAccessor;
}
export declare class ControllerAccessor extends Accessor {
}
