"use strict";
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
const ServiceBuilder_1 = require('./ServiceBuilder');
//# sourceMappingURL=index.js.map