/// <reference types="express" />
import { CommunicationController } from '../Controller';
import { Error500Controller } from './Error500Controller';
import { Error200Controller } from './Error200Controller';
import { Error300Controller } from './Error300Controller';
import { Error400Controller } from './Error400Controller';
import * as express from 'express';
export declare class ErrorController extends CommunicationController {
    protected Error200: Error200Controller;
    protected Error300: Error300Controller;
    protected Error400: Error400Controller;
    protected Error500: Error500Controller;
    constructor();
    private PasstoBase(key, v);
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
}
