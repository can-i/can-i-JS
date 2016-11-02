import { ServiceBuilder } from './ServiceBuilder';

export function Singleton(constructor:Function){
    ServiceBuilder.MarkSingleton(constructor);
    ServiceBuilder.Injectable(constructor);
}