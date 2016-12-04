"use strict";
var ServiceBuilder_1 = require("./ServiceBuilder");
exports.ServiceBuilder = ServiceBuilder_1.ServiceBuilder;
var ServiceBuilder_2 = require("./ServiceBuilder");
var Singleton_1 = require("./Singleton");
exports.Singleton = Singleton_1.Singleton;
function Injectable(constructor) {
    var s = constructor;
    ServiceBuilder_2.ServiceBuilder.Injectable(s);
}
exports.Injectable = Injectable;
//# sourceMappingURL=index.js.map