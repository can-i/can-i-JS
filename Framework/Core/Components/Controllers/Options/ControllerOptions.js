"use strict";
var RouteFormatter_1 = require("../../Routing/RouteFormatter");
var Internal_1 = require("../../../../Utilities/Internal");
var root = Internal_1.Root();
var ControllerOptions = (function () {
    function ControllerOptions(_class) {
        this._class = _class;
        this._route = "/";
        this.Settings = {};
        root.ControllerOptions.push(this);
    }
    Object.defineProperty(ControllerOptions.prototype, "klass", {
        get: function () {
            return this._class;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerOptions.prototype, "route", {
        get: function () {
            return this._route;
        },
        set: function (v) {
            this._route = RouteFormatter_1.default(v);
        },
        enumerable: true,
        configurable: true
    });
    return ControllerOptions;
}());
exports.ControllerOptions = ControllerOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ControllerOptions;
//# sourceMappingURL=ControllerOptions.js.map