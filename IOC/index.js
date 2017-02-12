"use strict";
var ServiceBuilder_1 = require("./ServiceBuilder");
exports.ServiceBuilder = ServiceBuilder_1.ServiceBuilder;
var ServiceBuilder_2 = require("./ServiceBuilder");
var Accessor_1 = require("../Win/Accessor");
var Singleton_1 = require("./Singleton");
exports.Singleton = Singleton_1.Singleton;
function Injectable(constructor) {
    var s = constructor;
    ServiceBuilder_2.ServiceBuilder.Injectable(s);
}
exports.Injectable = Injectable;
function Provides(provider) {
    return function ProviderDecorator(constructor) {
        var access = Accessor_1.default(constructor);
        access.provider = provider;
    };
}
exports.Provides = Provides;
//# sourceMappingURL=index.js.map