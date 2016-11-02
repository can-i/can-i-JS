import { ServiceBuilder } from './ServiceBuilder';

export function Injectable(constructor:Function){
    let s = constructor;   
    ServiceBuilder.Injectable(s);
}
