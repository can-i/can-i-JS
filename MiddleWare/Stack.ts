import { Express } from "../Win";


export type MiddleWareFunction = (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => any


//This is useful for stacking up middleware functions to place on your routes

export function Stack(...middleware: MiddleWareFunction[]): MiddleWareFunction {
    return function (req: Express.Request, res: Express.Response, next?: Express.NextFunction) {
        function again() {
            if (middleware.length > 1) {
                middleware[0](req, res, again);
            } else {
                middleware[0](req, res, next);
            }
            middleware.shift()
        }
        again();
    }
}




export default Stack;