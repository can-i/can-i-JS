"use strict";
const map = new Map();
exports.Accessor = function (obj) {
    let o = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o);
    if (!r) {
        r = {};
        map.set(o, r);
    }
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.Accessor;
//# sourceMappingURL=Accessor.js.map