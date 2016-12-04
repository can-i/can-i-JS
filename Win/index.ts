import { Event } from './../Event';
import { Configuration, Engine } from './../Config/Configuration';
import { configurationManager } from './../Config';
const consolidate = require("consolidate");
import { Boot } from "../Work/Boot";


import "reflect-metadata";

export import Express = require("express");

export * from "./Accessor";



const _ = require("lodash");
import glob = require("glob");
import Path = require("path");
import { Server } from 'http';

import { MiddleWareFunction } from "../MiddleWare";
import { Logger } from '../Utility/Log';




let bootoptions: Configuration | null | void;
let app: Express.Application;
export const State = {
    Ready: false
};


/**
 * The BootStrap function will create the server listener instance but not attach
 * it to the http listen yet. All directories are parsed for controllers and services at this point.
 */
export function BootStrap(options?: Configuration | null): Express.Application {
    //Guard against multiple Boot
    if (app) {
        Logger.AppError("Attempted boot multiple times");
        return app;
    }

    Logger.Main("Calling BootStrap");
    Logger.Main(`Options\n${JSON.stringify(options)}`)
    app = Express();


    let on_ready = function () {

        Logger.Main("Application created");

        if (options === null) {
            Logger.Main("Options are null\nNo Configuration used")
            console.warn(`No BootStrapping config.\nThe only excuse is Unit Testing!!`)
        }

        options = options || <Configuration>{};

        //Good Defaults
        let defaults: Configuration = {
            controllers: Path.join(process.cwd(), "controllers"),
            services: Path.join(process.cwd(), "services"),
            views: Path.join(process.cwd(), "views"),
            engine: {
                extension: 'html',
                engineName: "vash",
                engineConfig: null
            }
        }

        Logger.Main("Created default configuration")

        if (options !== null) {

            options = <Configuration>_.defaultsDeep(options, defaults);

            glob.sync(`${options.controllers}/**/*.js`).filter(x => /.js$/.test(x)).map(x => {
                Logger.Main(`Loading Controller ${x}`)
                return x;
            }).map(require);

            glob.sync(`${options.services}/**/*.js`).filter(x => /.js$/.test(x)).map(x => {
                Logger.Main(`Loading Service ${x}`)
                return x;
            }).map(require);

            let e: Engine = <Engine>options.engine
            app.set('views', options.views);
            app.set('view engine', e.extension);
            app.engine(<string>e.extension, consolidate[<string>e.engineName]);
        }

        State.Ready = true;
        Logger.Main("Application Ready");

    }

    OnReady(on_ready);

    Event.emit("can-i:bootstrapped");
    return app;
}




/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
export const App = function () {
    if (!app) {
        let msg = "Fatal Error. Attempted to Access Application before creation";
        let error = new Error(msg);
        Logger.AppError(error.stack);
        throw error;
    }
    Logger.Main("Retrieving Express App");
    return app;
}

let server: Server;


/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
export function Listen(...args: any[]) {

    Logger.Main("Attaching Listener to http server")

    let app = App();

    Logger.Main("Attaching Documentation");

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
    Logger.Main("Starting Job Engine")
    Boot();
}

/**
 * Use to make sure the application is in a safe state after bootstrap is called
 */
export function OnReady(...args: Function[]) {
    args.forEach(callback => {
        if (State.Ready) {
            callback();
        } else {
            Event.on("can-i:bootstrapped", callback)
        }
    })
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
















