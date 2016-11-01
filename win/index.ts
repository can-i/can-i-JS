import { Server } from 'http';
import { InternalDocumentationStructure } from "../help/Document";


export import Express = require("express");
export const app = Express();




let server: Server;

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


class Feature {
    constructor(public app: Express.Application) { }

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

class _ConfigurationManager {
    constructor(public app: Express.Application) {

    }
    public feature = new Feature(this.app);
}

export const ConfigurationManager = new _ConfigurationManager(app);






export function Listen(...args: any[]) {
    app.get("/can-i/document", function (req: any, res: any, next: any) {
        process.nextTick(() => {
            if (ConfigurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    })

    server = app.listen.apply(app, args)
}

export function Close() {
    return server.close();
}


export function GetServer() {
    return server;
}



export type InternalAccessorStructure = {
    inject: { [key: string]: any[] }
    methods: any,
    route_prefix: string
    documentation: InternalDocumentationStructure;
}


let map = new Map<any, any>();



export var Accessor = function (obj: any): InternalAccessorStructure {
    let o: any = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o.name)
    if (!r) {
        r = {};
        map.set(o.name, r)
    }
    return r;
}

