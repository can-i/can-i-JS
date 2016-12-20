/// <reference types="express" />
/// <reference types="node" />
import { Configuration } from './../Config/Configuration';
import "reflect-metadata";
export import Express = require("express");
export * from "./Accessor";
import { Server } from 'http';
export declare const State: {
    Ready: boolean;
};
/**
 * The BootStrap function will create the server listener instance but not attach
 * it to the http listen yet. All directories are parsed for controllers and services at this point.
 */
export declare function BootStrap(options?: Configuration | null): Express.Application;
/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
export declare const App: () => Express.Application;
/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
export declare function Listen(...args: any[]): void;
/**
 * Use to make sure the application is in a safe state after bootstrap is called
 */
export declare function OnReady(...args: Function[]): void;
/**
 * Gracefully shutdown the server.
 *
 */
export declare function Close(): any;
/**
 * Gets the instance of the server that is running
 */
export declare function GetServer(): Server;
