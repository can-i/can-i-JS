/// <reference types="express" />
import * as express from 'express';
import { ApplicationController } from './ApplicationController';
export declare class CommunicationController extends ApplicationController {
    private _req;
    private _res;
    private _next;
    /**
     * Express req Object
     */
    /**
     * Express req Object
     */
    req: express.Request;
    /**
     * The express res Object
     */
    /**
     * Express res Object
     */
    res: express.Response;
    /**
     * The express Next function used to go to the next middleware.
     */
    next: express.NextFunction;
    send(body?: any): this;
    /**
     * Set the Status of the response
     */
    status(code: number): this;
}
