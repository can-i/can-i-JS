import { RouteOption } from './RouteOption';
import { ServiceBuilder } from './../IOC/ServiceBuilder';
import { App, Express, Accessor, State } from './../Win';
import { Stack } from "../MiddleWare";
import { BaseController, ControllerConfig, IController } from './../LikeController';
import Event from '../Event';



///////////


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

                if (State.Ready) {
                        App().use(route, router);
                } else {
                        Event.on("can-i:bootstrapped", function () {
                                App().use(route, router)
                        })
                }
        }
}




let setter = new ControllerConfig();







