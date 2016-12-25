/// <reference types="node" />
/// <reference types="express" />
/// <reference types="core-js" />
import "reflect-metadata";
import * as Express from 'express';
import { Configuration } from '../Config/Configuration';
import * as http from "http";
export interface IServer {
    Listen(port: number, callback: Function): any;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
    close(): void;
}
export declare class ExpressServer implements IServer {
    private static _app;
    httpServer: http.Server;
    readonly App: Express.Application;
    Listen(port: number, callback: Function): void;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
    close(): void;
}
export interface IServerProvider {
    provide(): IServer;
}
export interface IFeatureLoader {
    load(config: Configuration): void;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
}
export declare abstract class AbstractFeatureLoader implements IFeatureLoader {
    protected serverProvider: IServerProvider;
    constructor(serverProvider: IServerProvider);
    readonly App: IServer;
    abstract load(config: Configuration): void;
    abstract convert(feature: string): string;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
}
export declare class ExpressFeatureLoader extends AbstractFeatureLoader {
    load(config: Configuration): void;
    convert(feature: string): string;
}
export interface IBootStrapInterpreter {
    parse(config?: Partial<Configuration>): void;
}
export declare class ExpressBootStrapInterpreter implements IBootStrapInterpreter {
    protected serverProvider: IServerProvider;
    protected featureLoader: IFeatureLoader;
    constructor(serverProvider: IServerProvider, featureLoader: IFeatureLoader);
    parse(config?: Partial<Configuration>): Promise<void>;
    loadControllers(config: Configuration): Promise<void>;
    loadServices(config: Configuration): Promise<void>;
    loadFeatures(config: Configuration): Promise<void>;
    loadFolder(folder: string): Promise<void>;
    protected getFolderFiles(folder: string): Promise<string[]>;
}
export declare class ExpressBasedApplication {
    protected serverProvider: IServerProvider;
    protected interpreter: IBootStrapInterpreter;
    server: IServer;
    ready: Promise<any>;
    private resolve;
    private server_instance;
    constructor(serverProvider: IServerProvider, interpreter: IBootStrapInterpreter);
    BootStrap(config?: Partial<Configuration> | null): void;
    Listen(port: number, callback: Function): void;
    Close(): Promise<void>;
    onReady(callback: Function): Promise<void>;
}
export declare class ApplicationFactory {
    static ExpressApplication(): ExpressBasedApplication;
}
