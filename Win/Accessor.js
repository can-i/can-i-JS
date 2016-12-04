"use strict";
var map = new Map();
exports.Accessor = function (obj) {
    var o = obj.constructor === Function ? obj : obj.constructor;
    var r = map.get(o);
    if (!r) {
        r = {};
        map.set(o, r);
    }
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Accessor;
//# sourceMappingURL=Accessor.js.map