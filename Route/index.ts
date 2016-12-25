import { RouteOption } from './RouteOption';
import { ServiceBuilder } from './../IOC/ServiceBuilder';
import { App, Express, Accessor, State } from './../Win';

import { BaseController, ControllerConfig, IController } from './../LikeController';
import Event from '../Event';
import { RouteLog as log } from '../Utility/Log';
import { InternalAccessorStructure } from '../IOC/InternalAccessorStructure';
import { OnReady } from '../Win/index';





export function Route(route: string = "/") {


        log.info(`new route: ${route}`);
        return function RouteAttacher(constructor: new (...args: any[]) => BaseController) {

                /**
                        Every class will have it's individual access object.
                        The Access Object is unique to every controller.
                        So using the access it can gain access to specific controller settings
                 */
                let class_accessor = Accessor(constructor);


                let binder = RouteBindingFactory.ExpressRouteBinder(route, constructor);

                // let binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Accessor(constructor));
                binder.bind();
        }
}




let setter = new ControllerConfig();




/**
 * This will map to the routing application.
 * it provides get and post methods
 */
export interface IRouterProxy {
        get(url: string, action: Function): void;
        post(url: string, action: any): void;
}


export abstract class RouterProxy implements IRouterProxy {


        _proxyRouter: IRouterProxy
        get proxyRouter() {
                if (!this._proxyRouter) {
                        this._proxyRouter = this.provider.provide()
                }

                return this._proxyRouter;
        }
        constructor(protected provider: IRouterProvider) {

        }

        abstract get(url: string, callback: any): void;
        abstract post(url: string, callback: any): void;

}


export class ExpressRouterProxy extends RouterProxy {

        private _router: Express.Router

        get(url: string, action: any) {
                this.router.get(url, action);
        }

        post(url: string, action: any) {
                this.router.post(url, action);
        }
        public get router() {
                if (!this._router) {
                        this._router = Express.Router()
                }
                return this._router;
        }
}

export interface IRouteBinder {
        bind(): void;
}



//TODO I need to find a way to not be so bounded to express;
//I wanted express as a quick setup and not as a fully tied to framework
//Design solution is needed here

export class ExpressRouteBinder implements IRouteBinder {
        constructor(protected route: string, protected provider: IRouterProvider, protected classAccess: Partial<InternalAccessorStructure>, protected app_provider: IAppProvider,protected stateProvider:IStateProvider) {

        }
        bind() {
                //The express router object
                let router = <ExpressRouterProxy>this.provider.provide();


                type ExpressKey = "get" | "post"//keyof IRouterProxy;
                let class_methods_of_options = this.classAccess.methods;
                let keys = <ExpressKey[]>Object.keys(class_methods_of_options) || [];
                for (const key of keys) {
                        let router_options: RouteOption[] = this.classAccess.methods[key];
                        router_options.forEach(router_option => {
                                router[key](router_option.route_name, router_option.route_function);
                        })
                }

                OnReady(()=>{
                        let App = this.app_provider.getApp()
                        App.use(this.route, router.router);
                })
        }
}
/**
 * Provides access to the proxy router that will bind to the underlying router
 */
export interface IRouterProvider {
        provide(): IRouterProxy;
}
export abstract class RouterProvider implements IRouterProvider {
        abstract provide(): IRouterProxy;
}
export class ExpressRouterProvider extends RouterProvider {
        provide(): IRouterProxy {
                return new ExpressRouterProxy(this);
        }
}




export class RouteBindingFactory {
        static ExpressRouteBinder(route: string, constructor: new () => BaseController) {
                let binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Accessor(constructor), new ExpressAppProvider(),new ExpressStateProvider);
                return binder;
        }
}



export interface IApp {
        use(route: string, callback: Function): any;
}



export interface IAppProvider {
        getApp(): IApp;
}
export class ExpressAppProvider implements IAppProvider {
        getApp() {
                return App();
        }
}


export interface IStateProvider{
        getState():IState;
}


export interface IState{
        Ready:boolean
}

export class ExpressStateProvider implements IStateProvider{
        getState(){
                return State
        }
}