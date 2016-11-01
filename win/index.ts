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



export type InternalAccessorStructure =  {
    inject:{ [key:string]: any[]}
    methods:any
}

export function Accessor(obj:Object):InternalAccessorStructure{
    let o:any = obj;
    let access = o.__can_u_leave_me_alone = o.__can_u_leave_me_alone || {};
    return access;  
}

