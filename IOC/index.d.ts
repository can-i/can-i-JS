export { ServiceBuilder } from './ServiceBuilder';
export { Singleton } from './Singleton';
export declare function Injectable(constructor: Function): void;
export interface Provider {
    provide(): any[];
}
export declare function Provides(provider: Provider): (constructor: new (...parameters: any[]) => any) => void;
