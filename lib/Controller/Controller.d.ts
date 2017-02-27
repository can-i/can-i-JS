/// <reference types="express" />
import * as express from "express";
/**
 * The Controller is responsible for giving access to the classic express properties
 * field: req
 * field: res
 * field: next
 *
 * Description:
 * These fields are really important for accessing
 * the paramter req,res and next
 * These are used with middlewares
 *
 */
export declare class Controller {
    protected req: express.Request;
    protected res: express.Response;
    protected next: express.NextFunction;
}
