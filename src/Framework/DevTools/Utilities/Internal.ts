import * as express from 'express';

let rootname = "com.can-i-js.www";


class InternalObject {
    App:express.Application;
}
export function Internal(): InternalObject {
    return global[rootname] || (global[rootname] = new InternalObject());
}

