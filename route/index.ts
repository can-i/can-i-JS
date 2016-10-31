import { BaseController, PublicController } from './../LikeController/index';
import { app, Express } from './../win/index';

let setter = new PublicController();


type RouteOption = {
    route_name: string,
    route_function: Express.RequestHandler
}


export function Route(route: string="/") {

    return function (constructor: new () => BaseController) {

        let router = Express.Router();

        if ('methods' in constructor) {
            let keys = Object.keys((<any>constructor).methods);
            for (let key of keys) {

                let routeOption: RouteOption[] = (<any>constructor).methods[key];
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
        }
        app.use(route,router);
    }
}


export function Get(route: string = '') {

    return function (target: BaseController, key: string, d: TypedPropertyDescriptor<any>) {
        const original = d.value;
        let constructor: any = target.constructor;

        constructor.methods = constructor.methods || {};

        let get = constructor.methods.get = <RouteOption[]>constructor.methods.get || [];

        get.push({
            route_name: route,
            route_function: async function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
                let controller: BaseController = new (<any>target).constructor();
                setter.set_up_controller(controller, req, res, next);
                await Promise.resolve(controller.onInit());
                original.apply(controller);
            }
        })
    }
}


export function Post(route: string = '') {

    return function (target: BaseController, key: string, d: TypedPropertyDescriptor<any>) {
        const original = d.value;
        let constructor: any = target.constructor;

        constructor.methods = constructor.methods || {};

        let post=constructor.methods.post = <RouteOption[]>(constructor.methods.post || []);

        post.push({
            route_name: route,
            route_function: async function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
                let controller: BaseController = new (<any>target).constructor();
                setter.set_up_controller(controller, req, res, next);
                await Promise.resolve(controller.onInit());
                original.apply(controller);
            }
        })
    }
}
