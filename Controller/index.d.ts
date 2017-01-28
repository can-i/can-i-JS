/// <reference types="express" />
/// <reference types="node" />
import Express = require('express');
import { ConfigurationManager } from '../Config/ConfigurationManager';
import { Server } from 'http';
import { Feature } from '../Config/Feature';
export interface IController {
    new (): BaseController;
}
/**
 * The Controller is the lowest form of the Controller classes.
 * This is used to give the default properties that every
 * controller expects to have.
 * The req,res and next variables
 */
export declare class Controller {
    protected res: Express.Response;
    protected req: Express.Request;
    protected next: Express.NextFunction;
}
/**
 * This class is used internally to help with the instanciation of
 * a new controller. It allows the protected fields.
 * req,res and next to be set.
 */
export declare class ControllerConfig extends Controller {
    set_up_controller(controller: Controller, req: Express.Request, res: Express.Response, next: Express.NextFunction): void;
}
/**
 * The BaseController is the controller that users will use in order
 * to extend and create there own controllers.
 *
 * It provides access to basic things that a user might find useful.
 */
export declare class BaseController extends Controller {
    /**
     * Access to the Express.Router that is used on a class.
     * This should not be used by the user.
     */
    static ___router: Express.Router;
    /**
     *
     */
    static methods: {};
    private internal_options;
    /**
     * Access to the Configuration Manager
     */
    protected readonly ConfigurationManager: ConfigurationManager;
    /**
     * Access to the running instance of the server.
     */
    protected readonly Server: Server;
    /**
     * Access to the App Instance that was created from Express
     */
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
