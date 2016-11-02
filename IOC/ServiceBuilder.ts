import { Accessor } from './../win/index';

const IOC_CONTAINER = new Map<any,any>();
let ioc = IOC_CONTAINER;

import "reflect-metadata";



var error = `
Cannot create and instance of Static Builder Class.
Methods need to be used Statictically

`.trim()

export class ServiceBuilder{

    constructor(){
        throw new Error(error);
    }

    static BuildService(target:new (...args:any[])=>any){
        let needs:any[] = Reflect.getMetadata("design:paramtypes",target);
        if(needs){
            needs = needs.map(ServiceBuilder.BuildService);
            return new target(...needs);
        }else{
            return new target();
        }
    }

    static getServiceMethodNeeds(target:Object,key:string){
        let access = Accessor(target);
        let needs:any[] = Reflect.getMetadata("design:paramtypes",target,key);
        if(needs){
            needs = needs.map(ServiceBuilder.BuildService);
        }
        return needs || [];
    }


    static Injectable(constructor:Function){
        ioc.set(constructor,constructor);
    }
}

