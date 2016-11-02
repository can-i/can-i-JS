import { App } from './../win/index';
import { RouteOption } from './RouteOption';
import { Accessor } from './../win/Accessor';
import { BaseController } from './../Controller/index';
import Express = require("express");


export function Route(route: string = "/") {

        return function RouteAttacher(constructor: new (...args: any[]) => BaseController) {

                let router = Express.Router();


                let access = Accessor(constructor);
                let keys = Object.keys(access.methods || {});
                access.route_prefix = route;
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

                App().use(route, router);
        }
}