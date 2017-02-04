import * as express from 'express';

let rootname = "com.can-i-js.www";


export class InternalObject {
    App:express.Application;
}

export function Root(): InternalObject {
    return global[rootname] || (global[rootname] = new InternalObject());
}