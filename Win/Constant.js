"use strict";
var GLOBAL_KEY = "__GLOBAL_CONSTANT_KEY_CHANGABLE";
var g = global;
var GLOBAL_STORE = new Map();
if ((GLOBAL_KEY in g)) {
    GLOBAL_STORE = g[GLOBAL_KEY];
}
else {
    g[GLOBAL_KEY] = GLOBAL_STORE;
}
var Constant = (function () {
    function Constant() {
    }
    Constant.set = function (key, data) {
        if (this.map.has(key)) {
            return this.map.get(key);
        }
        else {
            Constant.map.set(key, data);
        }
        return data;
    };
    return Constant;
}());
Constant.map = GLOBAL_STORE;
exports.Constant = Constant;
//# sourceMappingURL=Constant.js.map