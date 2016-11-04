import 'reflect-metadata';
import { ConfigurationManager } from './ConfigurationManager';

import { ServiceBuilder } from './../IOC/ServiceBuilder';
import {Express,App} from "../win";
import {Singleton} from "../IOC/Singleton";
import {Configuration} from "./Configuration";


export const configurationManager = ServiceBuilder.BuildService(ConfigurationManager);

export function Configure(options?: Configuration) {
    options = options || <Configuration>{};
    let features = options.features || []
    for (let f of features) {
        configurationManager.feature.enable(f);
    }
}













