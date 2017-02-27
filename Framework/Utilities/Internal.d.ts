/// <reference types="express" />
/// <reference types="node" />
import * as express from 'express';
import * as http from "http";
import { ControllerOptions } from '../Core/Components/Controllers/Options/ControllerOptions';
import { MainController } from '../Core/Components/Controllers/MainController';
export declare class RootContext<T extends MainController> {
    App: express.Application;
    Server: http.Server;
    ControllerOptions: ControllerOptions<T>[];
}
export declare function Root(): RootContext<MainController>;
