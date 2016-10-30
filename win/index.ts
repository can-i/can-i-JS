import { Server } from 'http';


export import Express = require("express");
export const app = Express();


let server:Server;

export function Listen(...args:any[]){
    server = app.listen.apply(app,args)
}

export function Close(){
    return server.close();
}


export function GetServer(){
    return server;
}


