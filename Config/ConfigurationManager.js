"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppGetter_1 = require("./AppGetter");
var Singleton_1 = require("../IOC/Singleton");
var Feature_1 = require("../Config/Feature");
var Log_1 = require("../Utility/Log");
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
ConfigurationManager = __decorate([
    Singleton_1.Singleton,
    __metadata("design:paramtypes", [Feature_1.Feature])
], ConfigurationManager);
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map