import * as express from 'express';
import * as http from "http";
import { ControllerOptions } from '../Core/Components/Controllers/Options/ControllerOptions';
import { MainController } from '../Core/Components/Controllers/MainController';
let rootname = "com.can-i-js.www";


export class RootContext <T extends MainController>{
    App:express.Application;
    Server:http.Server;

    ControllerOptions:ControllerOptions<T>[] = []
}

export function Root(): RootContext<MainController> {
    return global[rootname] || (global[rootname] = new RootContext());
}