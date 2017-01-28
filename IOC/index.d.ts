export { ServiceBuilder } from './ServiceBuilder';
export { Singleton } from './Singleton';
export declare function Injectable(constructor: Function): void;
/**
 * The provider is responsible for providing the required field to a class that is injectable.
 */
export interface Provider {
    provide(): any[];
}
/**
 * The Provides function is a decorator that is used to constructor the requirements that a class would need when it is instanciated.
 */
export declare function Provides(provider: Provider): (constructor: new (...parameters: any[]) => any) => void;
