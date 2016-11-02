"use strict";
const ServiceBuilder_1 = require('./ServiceBuilder');
function Injectable(constructor) {
    let s = constructor;
    ServiceBuilder_1.ServiceBuilder.Injectable(s);
}
exports.Injectable = Injectable;
function Singleton(constructor) {
    ServiceBuilder_1.ServiceBuilder.MarkSingleton(constructor);
    ServiceBuilder_1.ServiceBuilder.Injectable(constructor);
}
exports.Singleton = Singleton;
//# sourceMappingURL=index.js.map