import { InternalAccessorStructure } from '../win';


const IOC_CONTAINER = new Map<any,any>();
let ioc = IOC_CONTAINER;

import {Accessor} from "../win/index";
import "reflect-metadata";



export function Injectable(constructor:Function){
    let s = constructor;
    ioc.set(s,s);
    
}


export function Inject(target:Object,key:string,d:TypedPropertyDescriptor<any>){
    
    
    let access:InternalAccessorStructure = Accessor(target.constructor);
    let params:any[] = Reflect.getMetadata("design:paramtypes",target,key);
    
    access.inject = access.inject||{};
    access.inject[key]=params;
}


