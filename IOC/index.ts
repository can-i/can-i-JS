import { ServiceBuilder } from './ServiceBuilder';
import { Accessor } from './../win/index';
import { InternalAccessorStructure } from '../win';






export function Injectable(constructor:Function){
    let s = constructor;   
    ServiceBuilder.Injectable(s);
}


export function Singleton(constructor:Function){
    ServiceBuilder.MarkSingleton(constructor);
    ServiceBuilder.Injectable(constructor);
}

