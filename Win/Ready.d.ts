export interface IReady {
    isReady(): boolean;
    OnReady(callback: Function): void;
    Ready(): void;
}
export declare class Ready implements IReady {
    constructor();
    private store;
    isReady(): boolean;
    Ready(): void;
    OnReady(cb: Function): void;
}
