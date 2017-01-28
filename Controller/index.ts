import Express = require('express');
import { GetServer, App } from "../Win";
import { configurationManager } from './../Config';
import { ConfigurationManager } from '../Config/ConfigurationManager';
import { Server } from 'http';
import { Feature } from '../Config/Feature';


export interface IController {
    new (): BaseController
}



/**
 * The Controller is the lowest form of the Controller classes.
 * This is used to give the default properties that every
 * controller expects to have. 
 * The req,res and next variables
 */
export class Controller {
    protected res: Express.Response;
    protected req: Express.Request;
    protected next: Express.NextFunction;
}


/**
 * This class is used internally to help with the instanciation of
 * a new controller. It allows the protected fields.
 * req,res and next to be set.
 */
export class ControllerConfig extends Controller {

    public set_up_controller(controller: Controller, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        let c = <this>controller;
        c.req = req;
        c.res = res;
        c.next = next;
    }
}



/**
 * Internal Options allows the configuration of a controller. 
 * This will decide if the controller will be render as an html or 
 * if it will send JSON data.
 */
interface internalOptions {
    render?: boolean
    renderPage?:string
}


/**
 * The BaseController is the controller that users will use in order
 * to extend and create there own controllers.
 * 
 * It provides access to basic things that a user might find useful.
 */
export class BaseController extends Controller {

    /**
     * Access to the Express.Router that is used on a class.
     * This should not be used by the user.
     */
    public static ___router: Express.Router;

    /**
     * 
     */
    public static methods = {};


    private internal_options: internalOptions = {};


    /**
     * Access to the Configuration Manager
     */
    protected get ConfigurationManager():ConfigurationManager {
        return configurationManager;
    }

    /**
     * Access to the running instance of the server.
     */
    protected get Server():Server {
        return GetServer();
    }


    /**
     * Access to the App Instance that was created from Express
     */
    protected get App() {
        return App();
    }

    protected get features():Feature {
        return this.ConfigurationManager.feature
    }


    protected get session() {
        return (<any>this.req).session
    }

    protected set session(val) {
        (<any>this.req).session = val;
    }

    protected get body() {
        return (<any>this.req).body
    }

    constructor() {
        super();
    }



    onInit() {

    }

    sendFile(...args: any[]) {
        this.res.sendFile.apply(this.res, args);
    }


    status(...args: any[]) {
        this.res.status.apply(this.res, args);
    }

    protected render(data:Object) {
        return (<any>this.res.render)(data);
    }

    send(...args: any[]) {
        if (this.internal_options.render) {
            return (<any>this.render)(this.internal_options.renderPage,...args);
        } else {
            this.res.send.apply(this.res, args);
        }
    }
}


export default BaseController;
