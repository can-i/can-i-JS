import { RouteOption } from './RouteOption';
import { ServiceBuilder } from './../IOC/ServiceBuilder';
import { App, Express, Accessor, State } from './../Win';
import { Stack } from "../MiddleWare";
import { BaseController, ControllerConfig, IController } from './../LikeController';
import Event from '../Event';
import { RouteLog as log } from '../Utility/Log';
import { InternalAccessorStructure } from '../IOC/InternalAccessorStructure';





export function Route(route: string = "/") {


        log.info(`new route: ${route}`);
        return function RouteAttacher(constructor: new (...args: any[]) => BaseController) {

                // let router = Express.Router();


                // router.use(function (req, res, next) {
                //         log.debug(`using route:${route}`);
                //         next();
                // })



                /**
                        Every class will have it's individual access object.
                        The Access Object is unique to every controller.
                        So using the access it can gain access to specific controller settings
                 */
                let class_accessor = Accessor(constructor);


                /**
                All of the methods that are available on a particular controller
                will be placed in the access.methods object.
                This allows the controller to know which methods needs to be given a route.
                 */

                // let class_method_names = Object.keys(class_accessor.methods || {});
                // class_accessor.route_prefix = route;


                // for (let class_method_name of class_method_names) {

                //         let routeOptions: RouteOption[] = class_accessor.methods[class_method_name];
                //         for (let route_option of routeOptions) {
                //                 /**
                //                  * This is the express url to connect to the class method that needs to be used
                //                  */
                //                 router.use(route_option.route_name, function (req, res, next) {
                //                         log.info(`route: ${route} url ${route_option.route_name}`);
                //                         next();
                //                 })

                //                 switch (class_method_name.toLowerCase()) {
                //                         case 'get':
                //                                 router.get(route_option.route_name, route_option.route_function);
                //                                 break;
                //                         case 'post':
                //                                 router.post(route_option.route_name, route_option.route_function);
                //                                 break;
                //                 }
                //         }
                // }


                /**
                 * The Aplication may not be ready so it's important to only call this once the class is ready
                 */


                let binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Accessor(constructor));
                binder.bind();
        }
}




let setter = new ControllerConfig();




interface IRouterProxy {
        get(url: string, action: Function): void;
        post(url: string, action: Function): void;
}


abstract class RouterProxy implements IRouterProxy {


        _proxyRouter: IRouterProxy
        get proxyRouter() {
                if (!this._proxyRouter) {
                        this._proxyRouter = this.provider.provide()
                }

                return this._proxyRouter;
        }
        constructor(protected provider: IRouterProvider) {

        }
        get(url: string, action: Function) {
                this.proxyRouter.get(url, action);
        }

        post(url: string, action: Function) {
                this.proxyRouter.post(url, action);
        }
}


class ExpressRouterProxy extends RouterProxy {

        private _router: Express.Router

        public  get router() {
                if (!this._router) {
                        this._router = Express.Router()
                }
                return this._router;
        }
}

interface IRouteBinder {

}

class ExpressRouteBinder implements IRouteBinder {
        constructor(protected route: string, protected provider: IRouterProvider, protected classAccess: InternalAccessorStructure) {

        }

        bind() {
                let router = <ExpressRouterProxy>this.provider.provide();

                type ExpressKey = keyof IRouterProxy;
                let class_methods_of_options = this.classAccess.methods;
                let keys = <ExpressKey[]>Object.keys(class_methods_of_options) || [];

                for (const key of keys) {
                        let router_options: RouteOption[] = this.classAccess.methods[key];

                        router_options.forEach(router_option => {
                                this.provider.provide()[key](router_option.route_name, router_option.route_function);
                        })

                }

                if (State.Ready) {
                        App().use(this.route);
                } else {
                        Event.on("can-i:bootstrapped", () => {
                                App().use(this.route,router.router)
                        })
                }
        }
}



interface IRouterProvider {
        provide(): IRouterProxy;
}
abstract class RouterProvider implements IRouterProvider {
        abstract provide(): IRouterProxy;
}



class ExpressRouterProvider extends RouterProvider {

        provide(): IRouterProxy {
                return new ExpressRouterProxy(this);
        }
}




