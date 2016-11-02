

export type APIDetail = {
    title: string
    description: string
    query_string?: string[]
    response?: any;
} | { [key: string]: any };


export type InternalDocumentationStructure = {
    enabled: boolean
    classname: string
    class: APIDetail
    methods: { [key: string]: APIDetail }
    properties: { [key: string]: APIDetail }
}


function SetupFromConstructor(constructor: Function) {


    let access = Accessor(constructor);
    let d = access.documentation = access.documentation || { "classname": constructor.name, methods: {} }

    return d;
}



function SetupFromPrototype(target: any) {
    if (target instanceof Function)
        return SetupFromConstructor((<Function>target));
    else return null;
}

function SetUp(t: any): InternalDocumentationStructure {
    return SetupFromPrototype(t) || SetupFromConstructor(t);
}


let documentation_running = false;


export function Document(info: APIDetail) {
    return function (...args: any[]) {
        let [target, key_or_num, descriptor] = args;

        const d = SetUp(target);
        let key: string;

        switch (args.length) {
            case 1:
                DocumentClass.call(this, d, info)
                break;
            case 3:
                if (typeof args[2] === "number") {
                    //property
                    key = args[3];
                    DocumentProperty.call(this, d, key, info);
                } else {
                    //method
                    key = args[2];
                    DocumentMethod.call(this, d, key, info)
                }
                break;
        }
        (function (target) {

            let klass: InternalDocumentationStructure = Accessor(target).documentation;
            App().use(`/can-i/document`, function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
                res.locals[target.name] = klass;
                next();
            })
        })(target)
    }
}


function DocumentClass(d: InternalDocumentationStructure, info: APIDetail) {
    d.class = info;
}

function DocumentMethod(d: InternalDocumentationStructure, key: string, info: APIDetail) {
    d.methods[key] = info;
}

function DocumentProperty(d: InternalDocumentationStructure, key: string, info: APIDetail) {
    d.properties[key] = info;
}


export default Document;

import { App, Accessor, Express } from "../win";