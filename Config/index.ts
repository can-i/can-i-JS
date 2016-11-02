import { ServiceBuilder } from './../IOC/ServiceBuilder';
import {Express,App} from "../win";
import {Singleton} from "../IOC";

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

export const ConfigurationManager = ServiceBuilder.BuildService(_ConfigurationManager);
