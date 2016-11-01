"use strict";
const IOC_CONTAINER = new Map();
let ioc = IOC_CONTAINER;
const index_1 = require("../win/index");
require("reflect-metadata");
function Injectable(constructor) {
    let s = constructor;
    ioc.set(s, s);
}
exports.Injectable = Injectable;
function Inject(target, key, d) {
    let access = index_1.Accessor(target.constructor);
    let params = Reflect.getMetadata("design:paramtypes", target, key);
    access.inject = access.inject || {};
    access.inject[key] = params;
}
exports.Inject = Inject;
//# sourceMappingURL=index.js.map