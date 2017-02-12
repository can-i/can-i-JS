import "reflect-metadata";
import { Event } from './../Event';
import { Configuration, Engine } from './../Config/Configuration';
import { configurationManager } from './../Config';
const consolidate = require("consolidate");
import { Boot } from "../Work/Boot";
import { ApplicationFactory, ExpressServer, ExpressBasedApplication } from './Application';

const _ = require("lodash");
import glob = require("glob");
import Path = require("path");
import { Server } from 'http';

export import Express = require("express");
export * from "./Accessor";
import { MiddleWareFunction } from "../MiddleWare";
import { Logger } from '../Utility/Log';
import { Constant } from './Constant';


const EXPRESS_BASED_APPLICATION_KEY="EXPRESS_BASED_APPLICATION_KEY";

let application: ExpressBasedApplication = Constant.set(EXPRESS_BASED_APPLICATION_KEY,ApplicationFactory.ExpressApplication())




let bootoptions: Configuration | null | void;
let app: Express.Application;
export const State = {
    Ready: false
};


/**
 * The BootStrap function will create the server listener instance but not attach
 * it to the http listen yet. All directories are parsed for controllers and services at this point.
 */
export function BootStrap(options?: Partial<Configuration> | null) {

    return application.BootStrap(options);
}




/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
export const App = function () {
        return (<ExpressServer>application.server).App
}

let server: Server;


/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
export function Listen(...args: any[]) {

    let port: number;
    let callback: Function;
    [port, callback] = args;


    OnReady(function () {
        App().get("/can-i/document", function (req: any, res: any, next: any) {
            process.nextTick(() => {
                console.log(configurationManager.feature.enabled("documentation"))
                if (configurationManager.feature.enabled('documentation')) {
                    res.send(res.locals);
                }
                else {
                    next();
                }
            });
        })

    })
    return application.Listen(port, callback);
}

/**
 * Use to make sure the application is in a safe state after bootstrap is called
 */
export function OnReady(...args: Function[]) {
    args.forEach(cb => {
        application.onReady(cb);
    })
}

/**
 * Gracefully shutdown the server.
 * 
 */
export function Close() {
    application.Close();
}


/**
 * Gets the instance of the server that is running
 */
export function GetServer() {
    return application.server_instance
}
















