"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppGetter_1 = require("./AppGetter");
var Log_1 = require("../Utility/Log");
var Feature_1 = require("./Feature");
var ConfigurationManager = (function (_super) {
    __extends(ConfigurationManager, _super);
    function ConfigurationManager(_feature) {
        var _this = _super.call(this) || this;
        _this._feature = _feature;
        Log_1.AppLog.info("Booting Configuration manager");
        return _this;
    }
    Object.defineProperty(ConfigurationManager.prototype, "feature", {
        get: function () {
            Log_1.AppLog.debug("Getting features");
            return this._feature;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigurationManager;
}(AppGetter_1.AppGetter));
exports.ConfigurationManager = ConfigurationManager;
var ConfigurationFactory = (function () {
    function ConfigurationFactory() {
    }
    ConfigurationFactory.ConfigurationManager = function () {
        return new ConfigurationManager(Feature_1.FeatureFactory.ExpressFeature());
    };
    return ConfigurationFactory;
}());
exports.ConfigurationFactory = ConfigurationFactory;
//# sourceMappingURL=ConfigurationManager.js.map