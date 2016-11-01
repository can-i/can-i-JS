import { Constructor } from './../node_modules/make-error/index.d';
import { BaseController, PublicController, IController } from './../LikeController/index';
import { app, Express, Accessor, InternalAccessorStructure } from './../win/index';

let setter = new PublicController();


type RouteOption = {
        route_name: string,
        route_function: Express.RequestHandler
}




export function Route(route: string = "/") {

        return function RouteAttacher(constructor: new () => BaseController) {

                let router = Express.Router();


                let access = Accessor(constructor);
                let keys = Object.keys(access.methods);
                for (let key of keys) {

                        let routeOption: RouteOption[] = access.methods[key];
                        for (let o of routeOption) {
                                switch (key.toLowerCase()) {
                                        case 'get':
                                                router.get(o.route_name, o.route_function);
                                                break;
                                        case 'post':
                                                router.post(o.route_name, o.route_function);
                                                break;
                                }
                        }
                }

                app.use(route, router);
        }
}


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

// export function MkActivity(route: string = '') {
//         return ExtendRequest(route,'mkactivity');
// }

// export function MkActivity(route: string = '') {
//         return ExtendRequest(route,'move');
// }


//Needed Method Types
// options
// patch
// purge
// report
// search
// subscribe
// trace
// unlock
// unsubscribe


function ExtendRequest(route: string, type: string) {

        return function (target: BaseController, key: string, d: TypedPropertyDescriptor<any>) {
                // const original = d.value;
                let constructor: any = target.constructor;
                let access = Accessor(constructor);
                access.methods = access.methods || {};


                let handler = access.methods[type] = <RouteOption[]>(access.methods[type] || []);

                handler.push({
                        route_name: route,
                        route_function: async function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {

                                //Must check is has dependencies
                                let constructor = (<Object>target).constructor;

                                let access = Accessor(constructor);
                                let controller_instance: BaseController = new (<any>target).constructor();



                                setter.set_up_controller(controller_instance, req, res, next);
                                await Promise.resolve(controller_instance.onInit());

                                let controller_method = (<any>controller_instance)[key];
                                var injectable_names = Object.keys(access.inject)
                                let params: any = [];

                                if (~injectable_names.indexOf(key)) {
                                        params = access.inject[key];
                                        params = params.map(function (x: any) {

                                                //should i trust the user?
                                                //trust is for flowers and suckers!!!
                                                let instance: any;
                                                try {
                                                        instance = new x();
                                                } catch (e) {
                                                        instance = x;
                                                }
                                                return instance;
                                        })
                                }

                                controller_method.apply(controller_instance, params);
                        }
                })

                return d;
        }
}
