import { configurationManager } from './../Config/index';
//None Conflicting Dependencies

import "reflect-metadata";

export import Express = require("express");

export * from "./Accessor";



import _ = require("lodash");
import glob = require("glob");
import Path = require("path");
import { Server } from 'http';

import { MiddleWareFunction } from "../MiddleWare";


export function BootStrap(options: any) {
    app = Express();

    if (options === null) {
        return console.warn(`No BootStrapping config.\nThe only excuse is Unit Testing!!`)
    }

    options = options || {};

    //Good Defaults
    let defaults = {
        controllers: Path.join(process.cwd(), "controllers"),
        services: Path.join(process.cwd(), "services")
    };

    options = _.defaultsDeep(options, defaults);

    glob.sync(options.controllers).map(require);
    glob.sync(options.services).map(require);

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
















