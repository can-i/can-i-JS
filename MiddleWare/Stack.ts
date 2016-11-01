import { MiddleWareFunction } from '.';
import { Express } from "../Win";



//This is useful for stacking up middleware functions to place on your routes

export function Stack(...middleware: MiddleWareFunction[]): MiddleWareFunction {
    return function (req: Express.Request, res: Express.Response, next?: Express.NextFunction) {

        let i =-1, len=middleware.length;
        function again() {
            i++;
            if (i<len-1) {
                middleware[i](req, res, again);
            } else if(i===len-1){
                middleware[i](req, res, next);
            }
        }

        again();
    }
}




export default Stack;