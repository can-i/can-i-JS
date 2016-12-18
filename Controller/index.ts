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
    renderPage?: string
}



export type ControllerOptions = {
    configurationManager: ConfigurationManager;
    GetServerMethod: () => Server;
    GetAppMethod: () => Express.Application;
    SendMethod: (res: Express.Response, options: internalOptions, args: any[]) => void
}


export type SendFileOptions = {
    maxAge: number,
    root: string,
    lastModified: boolean,
    headers: any,
    dotfiles: "allow" | "deny" | "ignore",
    acceptRanges: boolean,
    cacheControl: boolean
}



export class BaseController extends Controller {

    public static ___router: Express.Router;
    public static methods = {};
    private internal_options: internalOptions = {};
    private configurationManager: ConfigurationManager;
    private GetServerMethod: () => Server;
    private GetAppMethod: () => Express.Application;

    private options: Partial<ControllerOptions>



    constructor(options: Partial<ControllerOptions> = {}) {
        super();

        this.options = options;

        if (!options.configurationManager) {
            this.configurationManager = configurationManager;
        } else {
            this.configurationManager = options.configurationManager
        }


        if (!options.GetServerMethod) {
            this.GetServerMethod = GetServer;
        } else {
            this.GetServerMethod = options.GetServerMethod;
        }

        if (!options.GetAppMethod) {
            this.GetAppMethod = App;
        } else {
            this.GetAppMethod = options.GetAppMethod;
        }
    }



    protected get ConfigurationManager(): ConfigurationManager {
        return this.configurationManager;
    }

    protected get Server(): Server {
        return this.GetServerMethod()
    }

    protected get App() {
        return this.GetAppMethod();
    }

    protected get features(): Feature {
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

    onInit() {

    }

    sendFile(path:string,options?:Partial<SendFileOptions>|Function,callback?:(err:any)=>any) {
        if (typeof options === 'function') {
            let temp = options;
            options = <any>callback;
            callback = <any>temp;
        }

        this.internalSendFile(this.res,path,options,callback);
    }

    private internalSendFile(res: Express.Response, path: string, options?:Partial<SendFileOptions>, callback?: (err:any) => any) {
        if (typeof options === 'function') {
            let temp = options;
            options = <any>callback;
            callback = temp;

        }
        
        if(callback && options){
            res.sendFile(path, options, callback)
        }else if(callback){
            res.sendFile(path,callback)
        }else if(options){
            res.sendFile(path,options)
        }else{
            res.sendFile(path);
        }
    }




    status(code: number) {
        return this.InternalsetStatus(this.res, code);
    }

    private InternalsetStatus(res: Express.Response, code: number) {
        res.status(code);
        return this;
    }



    protected render(data: any) {
        if(this.internal_options.renderPage){
            this.InternalRendering(this.res, this.internal_options.renderPage, data);
        }else{
            throw new Error("No render template set")
        }
    }

    private InternalRendering(res: Express.Response, template: string, callback?: (err: any, html:any) => any):void;
    private InternalRendering(res: Express.Response, template: string, local?: any, callback?: (err: any, html:any) => void) {
        if (typeof local === "function") {
            let temp = callback;
            callback = local;
            local = temp;
        }
        res.render(template, local, callback);
    }



    send(body: any) {
        this.InternalSend(this.res, this.internal_options, body);
    }

    private InternalSend(res: Express.Response, options: internalOptions, body: any) {
        if (options.render) {
            this.render(body)
        } else {
            res.send(body);
        }
    }
}


export default BaseController;
