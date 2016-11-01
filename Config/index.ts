import {Express,App} from "../win";

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



export class AppGetter{
    get app(){
        return App();
    }
}

class Feature extends AppGetter {
    constructor() { 
        super();
    }

    convert(f: string) {
        return `can-i feature ${f}`;
    }

    enable(f: string) {
        return this.app.enable(this.convert(f))
    }

    enabled(f: string) {
        return this.app.enabled(this.convert(f))
    }

    disable(f: string) {
        return this.app.disable(this.convert(f))
    }

    disabled(f: string) {
        return this.app.disabled(this.convert(f))
    }
}

class _ConfigurationManager extends AppGetter {
    constructor() {
        super();
    }
    public feature = new Feature();
}

export const ConfigurationManager:_ConfigurationManager = new _ConfigurationManager();
