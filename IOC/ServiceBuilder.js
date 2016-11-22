"use strict";
require("reflect-metadata");
var Accessor_1 = require("./../win/Accessor");
require("core-js");
var IOC_CONTAINER = new Map();
var ioc = IOC_CONTAINER;
var Singleton = new Map();
var error = "\nCannot create and instance of Static Builder Class.\nMethods need to be used Statictically\n\n".trim();
var metadata_error = "\nThere doesn't seem to be any metadata generated from your classes.\nYou can read more about metadata here: https://www.npmjs.com/package/reflect-metadata\nYou might be missing the following in your typescript file\n\n{\n    \"compilerOptions\": {\n        \"experimentalDecorators\": true,\n        \"emitDecoratorMetadata\": true\n    }\n}\n".trim();
var ServiceBuilder = (function () {
    function ServiceBuilder() {
        throw new Error(error);
    }
    ServiceBuilder.ConstructService = function (target) {
        var needs = Reflect.getMetadata("design:paramtypes", target);
        if (!needs) {
            console.warn(metadata_error);
            needs = [];
        }
        needs = needs.map(ServiceBuilder.BuildService);
        return new (target.bind.apply(target, [void 0].concat(needs)))();
    };
    ServiceBuilder.ConstructSingleton = function (target) {
        if (Singleton.has(target)) {
            return Singleton.get(target);
        }
        else {
            var instance = ServiceBuilder.ConstructService(target);
            Singleton.set(target, instance);
            return instance;
        }
    };
    ServiceBuilder.BuildService = function (target) {
        if (!ServiceBuilder.isManual(target) && !ServiceBuilder.isIOCCLASS(target)) {
            return null;
        }
        if (ServiceBuilder.isSingletonConstruct(target)) {
            return ServiceBuilder.ConstructSingleton(target);
        }
        else {
            return ServiceBuilder.ConstructService(target);
        }
    };
    ServiceBuilder.isIOCCLASS = function (target) {
        return ioc.has(target);
    };
    ServiceBuilder.isManual = function (target) {
    };
    ServiceBuilder.isSingletonConstruct = function (target) {
        var access = Accessor_1.Accessor(target);
        return access.singleton;
    };
    ServiceBuilder.getServiceMethodNeeds = function (target, key) {
        var access = Accessor_1.Accessor(target);
        var needs = Reflect.getMetadata("design:paramtypes", target, key);
        if (needs) {
            needs = needs.map(ServiceBuilder.BuildService);
        }
        return needs || [];
    };
    ServiceBuilder.Injectable = function (constructor) {
        ioc.set(constructor, constructor);
    };
    ServiceBuilder.InjectWith = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i - 0] = arguments[_i];
        }
        var target = _args[0], key = _args[1], args = _args[2];
        var access = Accessor_1.Accessor(target);
        access.injectWith = args;
        if (Array.isArray(key) && !args) {
            access.injectWith = {
                default: key
            };
        }
        else {
            var i = access.injectWith = access.injectWith || {};
            i[key] = args;
        }
    };
    ServiceBuilder.MarkSingleton = function (constructor) {
        var access = Accessor_1.Accessor(constructor);
        access.singleton = true;
    };
    return ServiceBuilder;
}());
exports.ServiceBuilder = ServiceBuilder;
//# sourceMappingURL=ServiceBuilder.js.map