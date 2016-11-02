

export interface IController{
    new():BaseController
}

export class Controller {
    protected res: express.Response;
    protected req: express.Request;
    protected next: express.NextFunction;
}


export class PublicController extends Controller{

     public set_up_controller(controller: Controller, req: express.Request, res: express.Response, next: express.NextFunction) {
        let c =<this>controller;
        c.req=req;
        c.res=res;
        c.next=next; 
    }
}


export class BaseController extends Controller {

    public static ___router:express.Router;

    public static methods = {};
    
    protected get ConfigurationManager(){
        return ConfigurationManager;
    }

    protected get Server(){
        return GetServer();
    }

    protected get App(){
        return App();
    }

    protected get features(){
        return this.ConfigurationManager.feature 
    }


    protected get session(){
        return (<any>this.req).session
    }

    protected set session(val){
        (<any>this.req).session = val;
    }

    protected get body(){
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


    send(...args: any[]) {
        this.res.send.apply(this.res, args);
    }
}


export default BaseController;

import { ConfigurationManager } from './../Config/index';
import express = require('express');
import {GetServer,App} from "../win";