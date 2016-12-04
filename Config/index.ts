import 'reflect-metadata';
import { ConfigurationManager } from './ConfigurationManager';

import { ServiceBuilder } from './../IOC/ServiceBuilder';
import { Express, App } from "../Win";
import { Singleton } from "../IOC/Singleton";
import { Configuration } from "./Configuration";

let r = ServiceBuilder.BuildService(ConfigurationManager);
if(r===null){
    throw new Error("Fatal Error, failed to build Configuration Manager Service")
}
export const configurationManager = r;

export function Configure(options?: Configuration) {
    options = options || <Configuration>{};
    let features = options.features || [];
    for (let f of features) {
        configurationManager.feature.enable(f);
    }
}













