"use strict";
var tslib_1 = require("tslib");
var root_1 = require("../App/root");
var uuid = require("uuid/v4");
var Accessor = (function () {
    function Accessor() {
        this.id = uuid();
    }
    return Accessor;
}());
exports.Accessor = Accessor;
var AccessorManager = (function () {
    function AccessorManager() {
    }
    Object.defineProperty(AccessorManager.prototype, "controller_accessor", {
        get: function () {
            var root = this.root;
            var map;
            if (!root.controller_accessor) {
                map = root.controller_accessor = new Map();
            }
            else {
                map = root.controller_accessor;
            }
            return map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccessorManager.prototype, "root", {
        /**
         * This will allow the framework to access
         */
        get: function () {
            return root_1.default;
        },
        enumerable: true,
        configurable: true
    });
    AccessorManager.prototype.GetControllerAccessor = function (Controller) {
        var accessor = this.controller_accessor;
        if (!accessor.has(Controller)) {
            accessor.set(Controller, new ControllerAccessor);
        }
        return accessor.get(Controller);
    };
    return AccessorManager;
}());
exports.AccessorManager = AccessorManager;
var ControllerAccessor = (function (_super) {
    tslib_1.__extends(ControllerAccessor, _super);
    function ControllerAccessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ControllerAccessor;
}(Accessor));
exports.ControllerAccessor = ControllerAccessor;
//# sourceMappingURL=Accessor.js.map