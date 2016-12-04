/// <reference types="express" />
/// <reference types="node" />
import { Configuration } from './../Config/Configuration';
import "reflect-metadata";
export import Express = require("express");
export * from "./Accessor";
import { Server } from 'http';
export declare function BootStrap(options?: Configuration | null): Express.Application | null;
export declare const App: () => Express.Application;
export declare function Listen(...args: any[]): void;
export declare function Close(): any;
export declare function GetServer(): Server;
