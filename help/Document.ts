import { InternalDocumentationStructure } from './InternalDocumentStructure';
import { InternalAccessorStructure } from './../IOC/InternalAccessorStructure';
import { App, Accessor, Express } from "../Win";
import { APIDetail } from './APIDetail';
import { State } from '../Win/index';
import Event from '../Event/index';

function SetupFromConstructor(constructor: Function) {


    let access = Accessor(constructor);
    let d: InternalDocumentationStructure = access.documentation = access.documentation || (<any>{ "classname": constructor.name, methods: {} })

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

            let keep_going = function () {
                App().use(`/can-i/document`, function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
                    res.locals[target.name] = klass;
                    next();
                })
            }

            if(State.Ready){
                keep_going()
            }else{
                Event.on("can-i:bootstrapped",keep_going);
            }

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
