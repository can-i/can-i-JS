import { MiddleWareFunction } from '.';
import { Express } from "../Win";



//This is useful for stacking up middleware functions to place on your routes

export function Stack(...middleware: MiddleWareFunction[]): MiddleWareFunction {
    return function (req: Express.Request, res: Express.Response, next?: Express.NextFunction) {
        let i = middleware.length;
        let j= 0
        function again() {
            if (i > 1) {
                middleware[j](req, res, again);
            } else if(i===1){
                middleware[j](req, res, next);
            }
            j++;
            i--;
        }

        again();
    }
}




export default Stack;