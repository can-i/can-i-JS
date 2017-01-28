export { ServiceBuilder } from './ServiceBuilder';
import { ServiceBuilder } from './ServiceBuilder';
import BaseController from '../Controller/index';
import Accessor from '../Win/Accessor';
export { Singleton } from './Singleton';


export function Injectable(constructor: Function) {
    let s = constructor;
    ServiceBuilder.Injectable(s);
}

/**
 * The provider is responsible for providing the required field to a class that is injectable. 
 */
export interface Provider {
    provide(): any[];
}


/**
 * The Provides function is a decorator that is used to constructor the requirements that a class would need when it is instanciated.
 */
export function Provides(provider: Provider) {

    return function ProviderDecorator(constructor: new (...parameters: any[]) => any) {
        let access = Accessor(constructor);
        access.provider = provider;
    }

}

