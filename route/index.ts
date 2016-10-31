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
    return ExtendRequest(route,'get');
}


export function Post(route: string = '') {
        return ExtendRequest(route,'post');
}

export function Use(route: string = '') {
        return ExtendRequest(route,'use');
}

export function Checkout(route: string = '') {
        return ExtendRequest(route,'checkout');
}

export function Copy(route: string = '') {
        return ExtendRequest(route,'copy');
}

export function Delete(route: string = '') {
        return ExtendRequest(route,'delete');
}

export function Head(route: string = '') {
        return ExtendRequest(route,'head');
}

export function Lock(route: string = '') {
        return ExtendRequest(route,'lock');
}

export function Merge(route: string = '') {
        return ExtendRequest(route,'merge');
}


export function MkActivity(route: string = '') {
        return ExtendRequest(route,'mkactivity');
}

export function MkCol(route: string = '') {
        return ExtendRequest(route,'mkcol');
}

export function Move(route: string = '') {
        return ExtendRequest(route,'move');
}

export function MSearch(route: string = '') {
        return ExtendRequest(route,'m-search');
}

export function Notify(route: string = '') {
        return ExtendRequest(route,'notify');
}

export function MkActivity(route: string = '') {
        return ExtendRequest(route,'mkactivity');
}

export function MkActivity(route: string = '') {
        return ExtendRequest(route,'move');
}




// mkcol
// move
// m-search
// notify
// options
// patch
// post
// purge
// put
// report
// search
// subscribe
// trace
// unlock
// unsubscribe


function ExtendRequest(route:string,type:string){

    return function (target: BaseController, key: string, d: TypedPropertyDescriptor<any>) {
        const original = d.value;
        let constructor: any = target.constructor;

        constructor.methods = constructor.methods || {};

        let handler=constructor.methods[type] = <RouteOption[]>(constructor.methods[type] || []);

        handler.push({
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
