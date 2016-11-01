import express = require('express');

import {GetServer,app} from "../win";

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
    
    protected get Server(){
        return GetServer();
    }

    protected get App(){
        return app;
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