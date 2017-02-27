"use strict";
var ObjectStringDigger_1 = require("./GlobalNameSpaceDriller/ObjectStringDigger");
/**
 * This is the string that contains the name for the internal
 * global namespace
 */
var ns = 'com.can-i.www.global';
function InternalNameSpace(namespace) {
    /**
     * This is the internal namespace.
     * This is a way to further divide up the  global namespace in nodejs.
     * This gives far less chances of having a namespace colission.
     *
     * This was inspired by the way android divides up their packages.
     *
     *
     *
     */
    var global_namespace_root = ObjectStringDigger_1.ObjectStringDigger(ns);
    var root = global_namespace_root[namespace] = global_namespace_root[namespace] || {};
    return root;
}
exports.InternalNameSpace = InternalNameSpace;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InternalNameSpace;
//# sourceMappingURL=internal_global.js.map