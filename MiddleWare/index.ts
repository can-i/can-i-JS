export * from "./Stack";
import { Accessor,Express } from "../Win";




export type MiddleWareFunction = (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => any

export function MiddleWare(func: MiddleWareFunction) {


    function MiddlewareStack(target:Function|Object):void;
    function MiddlewareStack(target: Function|Object,key?:string):void {
        let access = Accessor(target);
        access.middleware = access.middleware || [];
        let store: MiddleWareFunction[];
        if (key) {
            //Middleware on Specific routes
            access.middleware.route = access.middleware.route || {};
            store = access.middleware.route[key] = access.middleware.route[key] || [];
            // store.push(func);
        } else {
            //Middleware on global Object
            store = access.middleware.global = access.middleware.global || [];
        }
        store.push(func);
    }

    return MiddlewareStack;
}


export default MiddleWare;