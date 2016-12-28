"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Event_1 = require("./../Event");
var AppGetter_1 = require("./AppGetter");
var Log_1 = require("../Utility/Log");
var Constant_1 = require("../Win/Constant");
var get_set_box = Constant_1.Constant.set("GLOBAL_KEY_GET_SET_BOX", {});
var Feature = (function (_super) {
    __extends(Feature, _super);
    function Feature(enablerdisabler) {
        var _this = _super.call(this) || this;
        _this.enablerdisabler = enablerdisabler;
        Log_1.AppLog.debug("Booting Feature class");
        return _this;
    }
    Feature.prototype.convert = function (f) {
        return "can-i feature " + f;
    };
    Feature.prototype.enable = function (f) {
        this.enablerdisabler.enable(this.convert(f));
        return this;
    };
    Feature.prototype.enabled = function (f) {
        return this.enablerdisabler.enabled(this.convert(f));
    };
    Feature.prototype.disable = function (f) {
        this.enablerdisabler.disable(this.convert(f));
        return this;
    };
    Feature.prototype.disabled = function (f) {
        return this.enablerdisabler.disabled(this.convert(f));
    };
    Feature.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Event_1.Event.on.apply(Event_1.Event, args);
    };
    Feature.prototype.get = function (name, orMe) {
        var _return = get_set_box[name];
        if (_return === undefined) {
            return orMe;
        }
        else {
            return _return;
        }
    };
    // Feature.set("my_key_to_delete") :)
    Feature.prototype.set = function (name, value) {
        get_set_box[name] = value;
    };
    return Feature;
}(AppGetter_1.AppGetter));
exports.Feature = Feature;
var ExpressSettingsEnableDisable = (function (_super) {
    __extends(ExpressSettingsEnableDisable, _super);
    function ExpressSettingsEnableDisable() {
        return _super.apply(this, arguments) || this;
    }
    ExpressSettingsEnableDisable.prototype.enable = function (settings) {
        this.app.enable(settings);
    };
    ExpressSettingsEnableDisable.prototype.disable = function (settings) {
        this.app.disable(settings);
    };
    ExpressSettingsEnableDisable.prototype.enabled = function (settings) {
        return this.app.enabled(settings);
    };
    ExpressSettingsEnableDisable.prototype.disabled = function (settings) {
        return this.app.disabled(settings);
    };
    return ExpressSettingsEnableDisable;
}(AppGetter_1.AppGetter));
exports.ExpressSettingsEnableDisable = ExpressSettingsEnableDisable;
var ExpressSettingsEnableDisableLogger = (function (_super) {
    __extends(ExpressSettingsEnableDisableLogger, _super);
    function ExpressSettingsEnableDisableLogger() {
        return _super.apply(this, arguments) || this;
    }
    ExpressSettingsEnableDisableLogger.prototype.enable = function (settings) {
        console.log("enabling " + settings);
        _super.prototype.enable.call(this, settings);
    };
    ExpressSettingsEnableDisableLogger.prototype.enabled = function (settings) {
        var r = _super.prototype.enabled.call(this, settings);
        console.log(settings + " is " + (r ? 'enabled' : 'disabled'));
        return r;
    };
    ExpressSettingsEnableDisableLogger.prototype.disable = function (settings) {
        console.log("disabling " + settings);
        _super.prototype.disable.call(this, settings);
    };
    return ExpressSettingsEnableDisableLogger;
}(ExpressSettingsEnableDisable));
exports.ExpressSettingsEnableDisableLogger = ExpressSettingsEnableDisableLogger;
var FeatureFactory = (function () {
    function FeatureFactory() {
    }
    FeatureFactory.ExpressFeature = function () {
        return new Feature(new ExpressSettingsEnableDisable());
    };
    return FeatureFactory;
}());
exports.FeatureFactory = FeatureFactory;
//# sourceMappingURL=Feature.js.map