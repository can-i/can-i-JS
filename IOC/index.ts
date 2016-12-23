export { ServiceBuilder } from './ServiceBuilder';
import { ServiceBuilder } from './ServiceBuilder';
import BaseController from '../Controller/index';
import Accessor from '../Win/Accessor';
export { Singleton } from './Singleton';

export function Injectable(constructor: Function) {
    let s = constructor;
    ServiceBuilder.Injectable(s);
}

export class Provider {
    provide(): any[] {
        return []
    }
}

export function Provides(provider: Provider) {

    return function ProviderDecorator(constructor: new () => any) {
        let access = Accessor(constructor);
        access.provider = provider;
    }

}

