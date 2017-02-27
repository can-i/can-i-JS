/// <reference types="express" />
import { Controller } from "./Controller";
import * as express from "express";
export declare type ControllerConstructor = {
    new (): Controller;
};
export declare class ControllerFactory {
    static CreateBaseController(ControllerClass: ControllerConstructor, req: express.Request, res: express.Response, next: express.NextFunction): Controller;
}
