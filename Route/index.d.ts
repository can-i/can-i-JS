/// <reference types="express" />
import { Express } from './../Win';
import { BaseController } from './../LikeController';
import { InternalAccessorStructure } from '../IOC/InternalAccessorStructure';
export declare function Route(route?: string): (constructor: new (...args: any[]) => BaseController) => void;
/**
 * This will map to the routing application.
 * it provides get and post methods
 */
export interface IRouterProxy {
    get(url: string, action: Function): void;
    post(url: string, action: any): void;
}
export declare abstract class RouterProxy implements IRouterProxy {
    protected provider: IRouterProvider;
    _proxyRouter: IRouterProxy;
    readonly proxyRouter: IRouterProxy;
    constructor(provider: IRouterProvider);
    abstract get(url: string, callback: any): void;
    abstract post(url: string, callback: any): void;
}
export declare class ExpressRouterProxy extends RouterProxy {
    private _router;
    get(url: string, action: any): void;
    post(url: string, action: any): void;
    readonly router: Express.Router;
}
export interface IRouteBinder {
    bind(): void;
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
