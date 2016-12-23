export { ServiceBuilder } from './ServiceBuilder';
export { Singleton } from './Singleton';
export declare function Injectable(constructor: Function): void;
export declare class Provider {
    provide(): any[];
}
export declare function Provides(provider: Provider): (constructor: new () => any) => void;
