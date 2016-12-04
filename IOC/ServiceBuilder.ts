import 'reflect-metadata';
import { Accessor } from './../Win/Accessor';
import 'core-js';


const IOC_CONTAINER = new Map<any, any>();
let ioc = IOC_CONTAINER;
let Singleton = new Map<any, any>()






var error = `
Cannot create and instance of Static Builder Class.
Methods need to be used Statictically

`.trim()



const metadata_error = `
There doesn't seem to be any metadata generated from your classes.
You can read more about metadata here: https://www.npmjs.com/package/reflect-metadata
You might be missing the following in your typescript file

{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
`.trim()

export class ServiceBuilder {

    constructor() {
        throw new Error(error);
    }

    static ConstructService(target: new (...args: any[]) => any) {
        let needs: any[] = Reflect.getMetadata("design:paramtypes", target);
        if (!needs) {
            console.warn(metadata_error);
            needs = []
        }

        needs = needs.map(ServiceBuilder.BuildService);
        return new target(...needs);
    }

    static ConstructSingleton(target: new (...args: any[]) => any) {
        if (Singleton.has(target)) {
            return Singleton.get(target)
        } else {
            let instance = ServiceBuilder.ConstructService(target);
            Singleton.set(target, instance);
            return instance;
        }
    }

    static BuildService<T>(target: new (...args: any[]) => T):T|null {
        
        if (!ServiceBuilder.isManual(target) && !ServiceBuilder.isIOCCLASS(target)) {
            // throw new Error(`class ${target.name} is not injectable`)
            return null;
        }

        if (ServiceBuilder.isSingletonConstruct(target)) {
            return ServiceBuilder.ConstructSingleton(target)
        } else {
            return ServiceBuilder.ConstructService(target);
        }
    }


    static isIOCCLASS(target: any) {
        return ioc.has(target);
    }

    static isManual(target:any){

    }


    static isSingletonConstruct(target: new (...args: any[]) => any) {
        let access = Accessor(target);
        return access.singleton;
    }

    static getServiceMethodNeeds(target: Object, key: string) {
        let access = Accessor(target);
        let needs: any[] = Reflect.getMetadata("design:paramtypes", target, key);
        if (needs) {
            needs = needs.map(ServiceBuilder.BuildService);
        }
        return needs || [];
    }


    static Injectable(constructor: Function) {
        ioc.set(constructor, constructor);
    }

    static InjectWith(target: new (...args: any[]) => void, key: string): void
    static InjectWith(target: new (...args: any[]) => void, key: string, args: any[]): void
    static InjectWith(..._args: any[]): void {
        let [target, key, args] = _args;
        let access = Accessor(target);
        access.injectWith = args;
        if (Array.isArray(key) && !args) {
            access.injectWith = {
                default: key
            }
        } else {
            let i = access.injectWith = access.injectWith || {};
            (<any>i)[<string>key] = args;
        }
    }

    static MarkSingleton(constructor: Function) {
        let access = Accessor(constructor);
        access.singleton = true;
    }
}

