"use strict";
var win_1 = require("../win");
var Stack_1 = require("./Stack");
exports.Stack = Stack_1.Stack;
function MiddleWare(func) {
    function MiddlewareStack(target, key) {
        var access = win_1.Accessor(target);
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