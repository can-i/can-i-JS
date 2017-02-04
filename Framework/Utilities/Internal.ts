import * as express from 'express';
import * as http from "http";
let rootname = "com.can-i-js.www";


export class InternalObject {
    App:express.Application;
    Server:http.Server;
}

export function Root(): InternalObject {
    return global[rootname] || (global[rootname] = new InternalObject());
}