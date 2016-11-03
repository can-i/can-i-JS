"use strict";

var ServiceBuilder_1 = require('./ServiceBuilder');
function Singleton(constructor) {
    ServiceBuilder_1.ServiceBuilder.MarkSingleton(constructor);
    ServiceBuilder_1.ServiceBuilder.Injectable(constructor);
}
exports.Singleton = Singleton;
//# sourceMappingURL=Singleton.js.map