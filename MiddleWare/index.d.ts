/// <reference types="express" />
/// <reference types="core-js" />
import { Express } from "../Win";
export { Stack } from "./Stack";
export declare type MiddleWareFunction = (req: Express.Request, res: Express.Response, next?: Express.NextFunction) => any;
export declare function MiddleWare(func: MiddleWareFunction): (target: Object | Function) => void;
