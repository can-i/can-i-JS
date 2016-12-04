import Express = require('express');
import { GetServer, App } from "../Win";
import { configurationManager } from './../Config';
import { ConfigurationManager } from '../Config/ConfigurationManager';
import { Server } from 'http';
import { Feature } from '../Config/Feature';


export interface IController {
    new (): BaseController
}

export class Controller {
    protected res: Express.Response;
    protected req: Express.Request;
    protected next: Express.NextFunction;
}


export class ControllerConfig extends Controller {

    public set_up_controller(controller: Controller, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        let c = <this>controller;
        c.req = req;
        c.res = res;
        c.next = next;
    }
}

interface internalOptions {
    render?: boolean
    renderPage?:string
}


export class BaseController extends Controller {

    public static ___router: Express.Router;
    public static methods = {};
    private internal_options: internalOptions = {};



    protected get ConfigurationManager():ConfigurationManager {
        return configurationManager;
    }

    protected get Server():Server {
        return GetServer();
    }

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
