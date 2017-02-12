"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Stack"));
var Win_1 = require("../Win");
function MiddleWare(func) {
    function MiddlewareStack(target, key) {
        var access = Win_1.Accessor(target);
        access.middleware = access.middleware || [];
        var store;
        if (key) {
            //Middleware on Specific routes
            access.middleware.route = access.middleware.route || {};
            store = access.middleware.route[key] = access.middleware.route[key] || [];
        }
        else {
            //Middleware on global Object
            store = access.middleware.global = access.middleware.global || [];
        }
        store.push(func);
    }
    return MiddlewareStack;
}
exports.MiddleWare = MiddleWare;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MiddleWare;
//# sourceMappingURL=index.js.map