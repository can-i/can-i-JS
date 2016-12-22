"use strict";
var Win_1 = require("../Win");
function MiddleWare(func) {
    function MiddlewareStack(target, key) {
        var access = Win_1.Accessor(target);
        access.middleware = access.middleware || [];
        var store;
        if (key) {
            access.middleware.route = access.middleware.route || {};
            store = access.middleware.route[key] = access.middleware.route[key] || [];
            store.push(func);
        }
        else {
            store = access.middleware.global = access.middleware.global || [];
        }
        store.push(func);
    }
    return MiddlewareStack;
}
exports.MiddleWare = MiddleWare;
//# sourceMappingURL=index.js.map