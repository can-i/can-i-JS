export { ServiceBuilder } from './ServiceBuilder';
import { ServiceBuilder } from './ServiceBuilder';
import BaseController from '../Controller/index';
import Accessor from '../Win/Accessor';
export { Singleton } from './Singleton';

export function Injectable(constructor: Function) {
    let s = constructor;
    ServiceBuilder.Injectable(s);
}

export interface Provider {
    provide(): any[];
}

export function Provides(provider: Provider) {

    return function ProviderDecorator(constructor: new (...parameters:any[]) => any) {
        let access = Accessor(constructor);
        access.provider = provider;
    }

}

