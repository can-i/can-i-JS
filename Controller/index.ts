import Express = require('express');
import { GetServer, App } from "../win";
import { configurationManager } from './../Config/index';


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
}


export class BaseController extends Controller {

    public static ___router: Express.Router;
    public static methods = {};
    private internal_options: internalOptions = {};



    protected get ConfigurationManager() {
        return configurationManager;
    }

    protected get Server() {
        return GetServer();
    }

    protected get App() {
        return App();
    }

    protected get features() {
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

    protected render(...args:any[]) {
        let data:[string,any,any] = <any>args;
        return (<any>this.res.render)(...data);
    }

    send(...args: any[]) {
        if (this.internal_options.render) {
            return (<any>this.render)(...args);
        } else {
            this.res.send.apply(this.res, args);
        }
    }
}


export default BaseController;
