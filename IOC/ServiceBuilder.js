"use strict";
const index_1 = require('./../win/index');
const IOC_CONTAINER = new Map();
let ioc = IOC_CONTAINER;
require("reflect-metadata");
var error = `
Cannot create and instance of Static Builder Class.
Methods need to be used Statictically

`.trim();
class ServiceBuilder {
    constructor() {
        throw new Error(error);
    }
    static BuildService(target) {
        let needs = Reflect.getMetadata("design:paramtypes", target);
        if (needs) {
            needs = needs.map(ServiceBuilder.BuildService);
            return new target(...needs);
        }
        else {
            return new target();
        }
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
}
exports.ServiceBuilder = ServiceBuilder;
//# sourceMappingURL=ServiceBuilder.js.map