import { Event } from './../Event/index';
import { Configuration, Engine } from './../Config/Configuration';
import { configurationManager } from './../Config/index';
const consolidate = require("consolidate");
import {Boot} from "../Work/Boot";


import "reflect-metadata";

export import Express = require("express");

export * from "./Accessor";



const _ = require("lodash");
import glob = require("glob");
import Path = require("path");
import { Server } from 'http';

import { MiddleWareFunction } from "../MiddleWare";


/**
 * The BootStrap function will create the server listener instance but not attach
 * it to the http listen yet. All directories are parsed for controllers and services at this point.
 */
export function BootStrap(options?:Configuration|null):Express.Application|null {
    app = Express();

    if (options === null) {
        console.warn(`No BootStrapping config.\nThe only excuse is Unit Testing!!`)
    }

    options = options || <Configuration>{};

    //Good Defaults
    let defaults:Configuration = {
        controllers: Path.join(process.cwd(), "controllers"),
        services: Path.join(process.cwd(), "services"),
        views:Path.join(process.cwd(),"views"),
        engine:{
            extension:'html',
            engineName:"vash",
            engineConfig:null
        }
    }

    options = <Configuration>_.defaultsDeep(options, defaults);

    glob.sync(`${options.controllers}/**/*.js`).filter(x=> /.js$/.test(x)).map(x=>{
        //Can do logs here
        return x;
    }).map(require);
    glob.sync(`${options.services}/**/*.js`).filter(x=> /.js$/.test(x)).map(require);
    

    let e:Engine =  <Engine>options.engine
    app.set('views',options.views);
    app.set('view engine',e.extension);
    app.engine(<string>e.extension,consolidate[<string>e.engineName]);

    Event.emit("can-i:bootstrapped");
    return app;
}



let app: Express.Application;

/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
export const App = function () {
    if (!app) {
        throw new Error("Application has not been bootstrapped");
    }
    return app;
}

let server: Server;


/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
export function Listen(...args: any[]) {


    app.get("/can-i/document", function (req: any, res: any, next: any) {
        process.nextTick(() => {
            if (configurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    })    
    server = app.listen.apply(app, args);
    Boot();
}

/**
 * Gracefully shutdown the server.
 * 
 */
export function Close() {
    GetServer().close();
    return this;
}


/**
 * Gets the instance of the server that is running
 */
export function GetServer() {
    return server;
}
















