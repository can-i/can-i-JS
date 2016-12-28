

import "reflect-metadata";
import { Provider } from '../IOC/index';
import * as Express from 'express';
import { Configuration } from '../Config/Configuration';
import * as Path from 'path';
import * as glob from "glob";
import * as http from "http";
import Boot from '../Work/Boot';
import { AppLog } from '../Utility/Log';
import { Applog } from '../../ubungo/log/SimpleLog';
import { Ready, IReady } from './Ready';
import { Constant } from './Constant';


//#region Servers
export interface IServer {
    Listen(port: number, callback: Function): any;
    enable(feature: string): void;
    disable(feature: string): void;
    enabled(feature: string): boolean;
    disabled(feature: string): boolean;
    close(): void;
}



let key = "__GLOBAL__UBUNGO__SERVER_INSTANCE";



export class ExpressServer implements IServer {


    private static _app: Express.Application;
    httpServer: http.Server;
    get App():Express.Application {
        return Constant.set("EXPRESS",Express());
    }
    Listen(port: number, callback: Function) {
        return this.httpServer = Constant.set("__GLOBAL_EXPRESS_SERVER_LISTEN", this.App.listen(port, callback));
    }

    enable(feature: string): void {
        AppLog.info(`enabling ${feature}`)
        this.App.enable(feature);
    }
    disable(feature: string): void {
        AppLog.info(`disabling ${feature}`)
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
        return Constant.set("SERVER_PROVIDER_FEATURE_KEY",this.serverProvider.provide());
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
    parse(config?: Partial<Configuration>): void;
}


export class ExpressBootStrapInterpreter implements IBootStrapInterpreter {
    constructor(protected serverProvider: IServerProvider, protected featureLoader: IFeatureLoader) {

    }
    parse(config?: Partial<Configuration>) {
        //#region Base Default options
        if (config !== null) {
            config = config || {};
            config.engine = config.engine || {};
            //#endregion

            let app = this.serverProvider.provide();


            let controllers = Path.join(process.cwd(), "controllers");
            let services = Path.join(process.cwd(), "services");
            let views = Path.join(process.cwd(), "views");
            let engine = {
                extension: "html",
                engineName: "vash",
                engineConfig: <any>null
            }
            let default_config = { controllers, services, views, engine }

            config.engine = { ...default_config.engine, ...config.engine };
            config = { ...default_config, ...config };

            this.loadControllers(config);
            this.loadServices(config);
            this.loadFeatures(config);

        } else {

        }

    }


    loadControllers(config: Partial<Configuration>) {
        this.loadFolder(config.controllers)
    }
    loadServices(config: Partial<Configuration>) {
        this.loadFolder(config.services);
    }

    loadFeatures(config: Partial<Configuration>) {

    }


    loadFolder(folder?: string) {
        if (folder) {
            let files = this.getFolderFiles(folder);
            files.forEach(require);
        }
    }


    protected getFolderFiles(folder: string) {
        let resolve: any;
        let reject: any;
        let folders: string[] = [];
        folders = glob.sync(`${folder}/**/*.js`)
        return folders;
    }
}

//#endregion

const SERVER_INSTANCE_KEY="GLOBAL_SERVER_INSTANCE_KEY";
const SERVER_PROVIDER_PROVIDE_KEY="SERVER_PROVIDER_PROVIDE_KEY";
export class ExpressBasedApplication {
    server: IServer;

    server_instance:http.Server;


    constructor(protected serverProvider: IServerProvider, protected interpreter: IBootStrapInterpreter, protected readyProvider: IReady) {
        //#region Setup
        AppLog.info("ExpressBased Application Created")

        //#endregion
        this.server = Constant.set(SERVER_PROVIDER_PROVIDE_KEY,this.serverProvider.provide());
    }


    BootStrap(config?: Partial<Configuration> | null) {
        if (config !== null)
            this.interpreter.parse(config);
        this.readyProvider.Ready();
    }



    Listen(port: number, callback: Function) {
        try {
            var server_instance = this.server.Listen(port, () => {
                Applog.info(`Application Listening started`);
                callback();
                Boot();
                this.readyProvider.Ready();
            })

        } catch (e) {
        }
        return this.server_instance = Constant.set("__GLOBAL_APPLICATION_LISTEN", server_instance);
    }


    async Close() {
        this.server.close();
    }


    onReady(callback: Function) {
        this.readyProvider.OnReady(function () {
            callback();
        });
    }

}



//#region Factory

export class ApplicationFactory {
    static ExpressApplication() {
        let serverProvider = new ExpressServerProvider()
        let featureLoader = new ExpressFeatureLoader(serverProvider);
        let bootstrapInterpreter = new ExpressBootStrapInterpreter(serverProvider, featureLoader);
        let ReadyProvider = new Ready();
        return new ExpressBasedApplication(serverProvider, bootstrapInterpreter, ReadyProvider);
    }
}

//#endregion