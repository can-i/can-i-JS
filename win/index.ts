import { Configuration, Engine } from './../Config/Configuration';
import { configurationManager } from './../Config/index';
const consolidate = require("consolidate");
//None Conflicting Dependencies

import "reflect-metadata";

export import Express = require("express");

export * from "./Accessor";



import _ = require("lodash");
import glob = require("glob");
import Path = require("path");
import { Server } from 'http';

import { MiddleWareFunction } from "../MiddleWare";


export function BootStrap(options:Configuration|null):Express.Application|null {
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

    glob.sync(options.controllers).map(require);
    glob.sync(`${options.services}/**/*`).map(require);
    

    let e:Engine =  <Engine>options.engine
    app.set('views',options.views);
    app.set('view engine',e.extension);
    app.engine(e.extension,consolidate[e.engineName]);
    
    return app;
}



let app: Express.Application;

export const App = function () {
    if (!app) {
        throw new Error("Application has not been bootstrapped");
    }
    return app;
}

let server: Server;



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

    server = app.listen.apply(app, args)
}


export function Close() {
    return server.close();
}


export function GetServer() {
    return server;
}
















