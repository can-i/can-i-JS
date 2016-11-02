"use strict";
const index_1 = require('./../win/index');
const IOC_CONTAINER = new Map();
let ioc = IOC_CONTAINER;
let Singleton = new Map();
require("reflect-metadata");
var error = `
Cannot create and instance of Static Builder Class.
Methods need to be used Statictically

`.trim();
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
`.trim();
class ServiceBuilder {
    constructor() {
        throw new Error(error);
    }
    static ConstructService(target) {
        let needs = Reflect.getMetadata("design:paramtypes", target);
        if (!needs) {
            console.warn(metadata_error);
            needs = [];
        }
        needs = needs.map(ServiceBuilder.BuildService);
        return new target(...needs);
    }
    static ConstructSingleton(target) {
        if (Singleton.has(target)) {
            return Singleton.get(target);
        }
        else {
            let instance = ServiceBuilder.ConstructService(target);
            Singleton.set(target, instance);
            return instance;
        }
    }
    static BuildService(target) {
        if (!ServiceBuilder.isIOCCLASS(target)) {
            return null;
        }
        if (ServiceBuilder.isSingletonConstruct(target)) {
            return ServiceBuilder.ConstructSingleton(target);
        }
        else {
            return ServiceBuilder.ConstructService(target);
        }
    }
    static isIOCCLASS(target) {
        return ioc.has(target);
    }
    static isSingletonConstruct(target) {
        let access = index_1.Accessor(target);
        return access.singleton;
    }
    static getServiceMethodNeeds(target, key) {
        let access = index_1.Accessor(target);
        let needs = Reflect.getMetadata("design:paramtypes", target, key);
        if (needs) {
            needs = needs.map(ServiceBuilder.BuildService);
        }
        return needs || [];
    }
    static Injectable(constructor) {
        ioc.set(constructor, constructor);
    }
    static InjectWith(..._args) {
        let [target, key, args] = _args;
        let access = index_1.Accessor(target);
        access.injectWith = args;
        if (Array.isArray(key) && !args) {
            access.injectWith = {
                default: key
            };
        }
        else {
            let i = access.injectWith = access.injectWith || {};
            i[key] = args;
        }
    }
    static MarkSingleton(constructor) {
        let access = index_1.Accessor(constructor);
        access.singleton = true;
    }
}
exports.ServiceBuilder = ServiceBuilder;
//# sourceMappingURL=ServiceBuilder.js.map