
export type Configuration = {
    features?: string[]
}


export function Features() {
    return ["documentation"]
}

export function Configure(options: Configuration = {}) {
    let features = options.features || []
    for (let f of features) {
        ConfigurationManager.feature.enable(f);
    }
}



import {Singleton} from "../IOC";

@Singleton
export class AppGetter{
    get app(){
        return App();
    }
}

@Singleton
class Feature extends AppGetter {
    constructor() { 
        super();
    }

    private convert(f: string) {
        return `can-i feature ${f}`;
    }

    public enable(f: string) {
        return this.app.enable(this.convert(f))
    }

    public enabled(f: string) {
        return this.app.enabled(this.convert(f))
    }

    public disable(f: string) {
        return this.app.disable(this.convert(f))
    }

    public disabled(f: string) {
        return this.app.disabled(this.convert(f))
    }

    public on(...args:any[]){
        return (<any>this.app.on)(...args);
    }
}

@Singleton
class _ConfigurationManager extends AppGetter {
    constructor(private _feature:Feature) {
        super();
    }

    get feature(){
        return this._feature;
    }
}

import { ServiceBuilder } from './../IOC/ServiceBuilder';
export const ConfigurationManager = ServiceBuilder.BuildService(_ConfigurationManager);
import {Express,App} from "../win";