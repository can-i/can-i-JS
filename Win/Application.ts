

import "reflect-metadata";
import { Provider } from '../IOC/index';
import * as Express from 'express';
import { Configuration } from '../Config/Configuration';
import * as Path from 'path';
import * as glob from "glob";
import * as http from "http";
import Boot from '../Work/Boot';

//#region Servers
export interface IServer {
    Listen(port: number, callback: Function): any;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;

    close(): void;

}


export class ExpressServer implements IServer {


    private static _app: Express.Application;
    private httpServer: http.Server;
    get App() {
        return ExpressServer._app || (ExpressServer._app = Express());
    }
    Listen(port: number, callback: Function) {
        this.httpServer = this.App.listen(port, callback);
    }

    enable(feature: string): void {
        this.App.enable(feature);
    }
    disable(feature: string): void {
        this.App.disable(feature);
    }
    enabled(feature: string) {
        return this.App.enabled(feature);
    }
    disabled(feature: string) {
        return this.App.disabled(feature);
    }

    close() {
        this.httpServer.close()
    }


}


export interface IServerProvider {
    provide(): IServer;
}


class ExpressServerProvider implements IServerProvider {
    provide() {
        return new ExpressServer();
    }
}

//#endregion


//#region Feature Loader

export interface IFeatureLoader {
    load(config: Configuration): void;

    enable(feature: string): void;
    disable(feature: string): void;

    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
}


export abstract class AbstractFeatureLoader implements IFeatureLoader {
    constructor(protected serverProvider: IServerProvider) {

    }

    get App() {
        return this.serverProvider.provide();
    }
    abstract load(config: Configuration): void;

    abstract convert(feature: string): string;

    enable(feature: string) {
        feature = this.convert(feature);
        this.App.enable(feature);
    }
    disable(feature: string) {
        feature = this.convert(feature);
        this.App.disable(feature)
    }

    enabled(feature: string) {
        feature = this.convert(feature);
        return this.App.enabled(feature)
    }

    disabled(feature: string) {
        feature = this.convert(feature);
        return this.App.disabled(feature)
    }
}


export class ExpressFeatureLoader extends AbstractFeatureLoader {
    load(config: Configuration) {
        let server = this.serverProvider.provide()
    }

    convert(feature: string) {
        return `can-i/feature ${feature}`
    }
}

//#endregion



//#region BootStrap

export interface IBootStrapInterpreter {
    parse(config: Partial<Configuration>): void;
}


export class ExpressBootStrapInterpreter implements IBootStrapInterpreter {
    constructor(protected serverProvider: IServerProvider, protected featureLoader: IFeatureLoader) {

    }
    async parse(config: Partial<Configuration>) {
        //#region Base Default options
        if (config !== null) {

            config.engine = config.engine || {};
            //#endregion

            let app = this.serverProvider.provide();


            let controllers = Path.join(process.cwd(), "controllers");
            let services = Path.join(process.cwd(), "services");
            let views = Path.join(process.cwd(), "views");
            let engine = {
                extension: "html",
                engineName: "vash",
                engineConfig: null
            }
            let default_config = { controllers, services, views, engine }

            config.engine = { ...default_config.engine, ...config.engine };
            config = { ...default_config, ...config };


        } else {

        }

    }


    async loadControllers(config: Configuration) {
        await this.loadFolder(config.controllers)
    }
    async loadServices(config: Configuration) {
        await this.loadFolder(config.services);
    }

    async loadFeatures(config: Configuration) {

    }


    async loadFolder(folder: string) {
        let files = await this.getFolderFiles(folder);
        files.forEach(require);
    }


    protected async getFolderFiles(folder: string) {
        return Promise.resolve((async () => {
            let resolve: any;
            let reject: any;
            let folders: string[] = [];


            glob(`${folder}/**/*.js`, (err, files) => {
                folders = files;
                resolve();
            })
            await new Promise((r, rj) => {
                resolve = r;
                reject = rj;
            })

            return folders;
        })())
    }
}

//#endregion



export class ExpressBasedApplication {
    server: IServer;
    ready: Promise<any>
    private resolve: any;

    private server_instance: http.Server
    constructor(protected serverProvider: IServerProvider, protected interpreter: IBootStrapInterpreter) {
        //#region Setup
        this.ready = new Promise((r, rj) => {
            this.resolve = r;
        })
        //#endregion


        this.server = this.serverProvider.provide();
    }


    BootStrap(config: Partial<Configuration>) {
        this.interpreter.parse(config);
    }

    Listen(port: number, callback: Function) {
        let server_instance = this.server.Listen(port, () => {
            callback();
            Boot();
            this.resolve();
        })

        this.server_instance = server_instance;
    }


    async Close() {
        await this.ready;
        this.server.close();
    }


    async onReady(callback: Function) {
        await this.ready;
        callback()
    }

}




//#region Factory

export class ApplicationFactory {
    static ExpressApplication() {
        let serverProvider = new ExpressServerProvider()
        let featureLoader = new ExpressFeatureLoader(serverProvider);
        let bootstrapInterpreter = new ExpressBootStrapInterpreter(serverProvider, featureLoader);
        return new ExpressBasedApplication(serverProvider, bootstrapInterpreter);
    }
}

//#endregion