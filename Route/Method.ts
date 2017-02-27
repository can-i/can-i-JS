import { RouteOption } from './RouteOption';
import { Accessor } from './../Win/Accessor';
import { BaseController, ControllerConfig } from './../Controller';
import { ServiceBuilder } from './../IOC/ServiceBuilder';
import Express = require("express");
import { Stack } from "../MiddleWare/Stack";


export function Get(route: string = '') {
        return ExtendRequest(route, 'get');
}


export function Post(route: string = '') {
        return ExtendRequest(route, 'post');
}

export function Put(route: string = '') {
        return ExtendRequest(route, 'put');
}

export function Use(route: string = '') {
        return ExtendRequest(route, 'use');
}

export function Checkout(route: string = '') {
        return ExtendRequest(route, 'checkout');
}

export function Copy(route: string = '') {
        return ExtendRequest(route, 'copy');
}

export function Delete(route: string = '') {
        return ExtendRequest(route, 'delete');
}

export function Head(route: string = '') {
        return ExtendRequest(route, 'head');
}

export function Lock(route: string = '') {
        return ExtendRequest(route, 'lock');
}

export function Merge(route: string = '') {
        return ExtendRequest(route, 'merge');
}


export function MkActivity(route: string = '') {
        return ExtendRequest(route, 'mkactivity');
}

export function MkCol(route: string = '') {
        return ExtendRequest(route, 'mkcol');
}

export function Move(route: string = '') {
        return ExtendRequest(route, 'move');
}

export function MSearch(route: string = '') {
        return ExtendRequest(route, 'm-search');
}

export function Notify(route: string = '') {
        return ExtendRequest(route, 'notify');
}

export function Options(route: string = '') {
        return ExtendRequest(route, 'options');
}

export function Patch(route: string = '') {
        return ExtendRequest(route, 'patch');
}

export function Report(route: string = '') {
        return ExtendRequest(route, 'report');
}

export function Search(route: string = '') {
        return ExtendRequest(route, 'search');
}

export function Subscribe(route: string = '') {
        return ExtendRequest(route, 'subscribe');
}


export function Trace(route: string = '') {
        return ExtendRequest(route, 'trace');
}

export function Unlock(route: string = '') {
        return ExtendRequest(route, 'unlock');
}

export function unsubscribe(route: string = '') {
        return ExtendRequest(route, 'unsubscribe');
}



function ExtendRequest(route: string, type: string) {
        //TODO clean up this mess
        return function (target: BaseController, key: string, d: TypedPropertyDescriptor<any>) {

                let constructor: any = target.constructor;
                let access = Accessor(constructor);
                access.methods = access.methods || {};


                let handler = access.methods[type] = <RouteOption[]>(access.methods[type] || []);

                handler.push({
                        route_name: route,
                        route_function: async function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {

                                try {
                                        let constructor: new (...args: any[]) => any = <any>target.constructor;



                                        let access = Accessor(constructor);

                                        if (access.middleware && access.middleware.global && access.middleware.global.length) {
                                                let middleware = Stack.apply(this, access.middleware.global);

                                                //TODO why the reject
                                                await new Promise((reject, resolve) => {
                                                        //TODO next with a string is an error, don't know why i did that
                                                        middleware(req, res, function (response: any) {
                                                                if (response instanceof String) {
                                                                        next(response);
                                                                } else {
                                                                        reject(response);
                                                                }
                                                        });
                                                })
                                        }

                                        let controller_instance: BaseController;
                                        if (access.provider) {
                                                let args = access.provider.provide();
                                                controller_instance = new constructor(...args);
                                        } else {
                                                controller_instance = ServiceBuilder.ConstructService(constructor);

                                        }


                                        let setter = new ControllerConfig();
                                        setter.set_up_controller(controller_instance, req, res, next);
                                        //Allow Async for init function
                                        await Promise.resolve(controller_instance.onInit());

                                        //The methods middleware stack
                                        if (access.middleware && access.middleware.route && access.middleware.route[key] && access.middleware.route[key].length) {

                                                let middleware = Stack.apply(this, access.middleware.route[key]);
                                                await new Promise((resolve, reject) => {
                                                        middleware(req, res, function (response: any) {
                                                                if (response instanceof String) {
                                                                        next(response);
                                                                } else {
                                                                        resolve(response);
                                                                }
                                                        });
                                                })
                                        }

                                        let params: any = [];
                                        //Dependency injection
                                        params = ServiceBuilder.getServiceMethodNeeds(target, key);

                                        try {
                                                await Promise.resolve(((<any>controller_instance)[key](...params)));
                                        } catch (e) {
                                                next(e)
                                        }
                                } catch (e) {
                                        next(e);
                                }


                        }
                })
                return d;
        }

}