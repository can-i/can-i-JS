/// <reference types="express" />
import { Express } from './../Win';
import { BaseController } from './../LikeController';
import { InternalAccessorStructure } from '../IOC/InternalAccessorStructure';
export declare function Route(route?: string): (constructor: new (...args: any[]) => BaseController) => void;
export interface IRouterProxy {
    get(url: string, action: Function): void;
    post(url: string, action: Function): void;
}
export declare abstract class RouterProxy implements IRouterProxy {
    protected provider: IRouterProvider;
    _proxyRouter: IRouterProxy;
    readonly proxyRouter: IRouterProxy;
    constructor(provider: IRouterProvider);
    get(url: string, action: Function): void;
    post(url: string, action: Function): void;
    readonly abstract router: any;
}
export declare class ExpressRouterProxy extends RouterProxy {
    private _router;
    readonly router: Express.Router;
}
export interface IRouteBinder {
}
export declare class ExpressRouteBinder implements IRouteBinder {
    protected route: string;
    protected provider: IRouterProvider;
    protected classAccess: InternalAccessorStructure;
    constructor(route: string, provider: IRouterProvider, classAccess: InternalAccessorStructure);
    bind(): void;
}
/**
 * Provides access to the proxy router that will bind to the underlying router
 */
export interface IRouterProvider {
    provide(): IRouterProxy;
}
export declare abstract class RouterProvider implements IRouterProvider {
    abstract provide(): IRouterProxy;
}
export declare class ExpressRouterProvider extends RouterProvider {
    provide(): IRouterProxy;
}
