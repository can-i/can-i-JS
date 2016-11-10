"use strict";
const ServiceBuilder_1 = require('./ServiceBuilder');
var Singleton_1 = require('./Singleton');
exports.Singleton = Singleton_1.Singleton;
function Injectable(constructor) {
    let s = constructor;
    ServiceBuilder_1.ServiceBuilder.Injectable(s);
}
exports.Injectable = Injectable;
//# sourceMappingURL=index.js.map