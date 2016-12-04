export { ServiceBuilder } from './ServiceBuilder';
import { ServiceBuilder } from './ServiceBuilder';
export { Singleton } from './Singleton';

export function Injectable(constructor:Function){
    let s = constructor;   
    ServiceBuilder.Injectable(s);
}



