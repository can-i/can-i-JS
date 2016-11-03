"use strict";

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = new _map2.default();
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