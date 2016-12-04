/// <reference types="core-js" />
import 'reflect-metadata';
import 'core-js';
export declare class ServiceBuilder {
    constructor();
    static ConstructService(target: new (...args: any[]) => any): any;
    static ConstructSingleton(target: new (...args: any[]) => any): any;
    static BuildService<T>(target: new (...args: any[]) => T): T | null;
    static isIOCCLASS(target: any): boolean;
    static isManual(target: any): void;
    static isSingletonConstruct(target: new (...args: any[]) => any): boolean | undefined;
    static getServiceMethodNeeds(target: Object, key: string): any[];
    static Injectable(constructor: Function): void;
    static InjectWith(target: new (...args: any[]) => void, key: string): void;
    static InjectWith(target: new (...args: any[]) => void, key: string, args: any[]): void;
    static MarkSingleton(constructor: Function): void;
}