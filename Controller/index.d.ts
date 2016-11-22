/// <reference types="express" />
/// <reference types="node" />
/// <reference types="core-js" />
import Express = require('express');
import { ConfigurationManager } from '../Config/ConfigurationManager';
import { Server } from 'http';
import { Feature } from '../Config/Feature';
export interface IController {
    new (): BaseController;
}
export declare class Controller {
    protected res: Express.Response;
    protected req: Express.Request;
    protected next: Express.NextFunction;
}
export declare class ControllerConfig extends Controller {
    set_up_controller(controller: Controller, req: Express.Request, res: Express.Response, next: Express.NextFunction): void;
}
export declare class BaseController extends Controller {
    static ___router: Express.Router;
    static methods: {};
    private internal_options;
    protected readonly ConfigurationManager: ConfigurationManager;
    protected readonly Server: Server;
    protected readonly App: Express.Application;
    protected readonly features: Feature;
    protected session: any;
    protected readonly body: any;
    constructor();
    onInit(): void;
    sendFile(...args: any[]): void;
    status(...args: any[]): void;
    protected render(data: Object): any;
    send(...args: any[]): any;
}
export default BaseController;
