import 'reflect-metadata';
import { ConfigurationManager, ConfigurationFactory } from './ConfigurationManager';

import { ServiceBuilder } from './../IOC/ServiceBuilder';
import { Express, App } from "../Win";
import { Singleton } from "../IOC/Singleton";
import { Configuration } from "./Configuration";
import { OnReady } from '../Win/index';
import { AppLog } from '../Utility/Log';

let r = ConfigurationFactory.ConfigurationManager();
if (r === null) {
    throw new Error("Fatal Error, failed to build Configuration Manager Service")
}
export const configurationManager = r;

export function Configure(options?: Partial<Configuration>) {
    OnReady(function () {
        AppLog.info("adding configuraion");
        options = options || <Configuration>{};
        let features = options.features || [];
        for (let f of features) {
            configurationManager.feature.enable(f);
        }
    })
}













