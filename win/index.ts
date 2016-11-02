let map = new Map<any, any>();

export const Accessor = function (obj: any): InternalAccessorStructure {
    let o: any = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o)
    if (!r) {
        r = {};
        map.set(o, r)
    }
    return r;
}

export import Express = require("express");

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
            if (ConfigurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    })

    server = app.listen.apply(app, args)
}

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

import { ConfigurationManager } from './../Config/index';
import { Server } from 'http';
import { InternalDocumentationStructure } from "../help/Document";

import { MiddleWareFunction } from "../MiddleWare";
import _ = require("lodash");
import glob = require("glob");

import Path = require("path");






export function Close() {
    return server.close();
}


export function GetServer() {
    return server;
}


interface injectWith {
    default?: any[]
}

export type InternalAccessorStructure = {
    inject: { [key: string]: any[] }
    methods: any,
    route_prefix: string
    documentation: InternalDocumentationStructure;
    middleware: { global?: MiddleWareFunction[], route?: { [key: string]: MiddleWareFunction[] } }
    singleton?: boolean
    injectWith: injectWith
}






