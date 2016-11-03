"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const AppGetter_1 = require('./AppGetter');
const Singleton_1 = require("../IOC/Singleton");
const Feature_1 = require("../Config/Feature");
let ConfigurationManager = class ConfigurationManager extends AppGetter_1.AppGetter {
    constructor(_feature) {
        super();
        this._feature = _feature;
    }
    get feature() {
        return this._feature;
    }
};
ConfigurationManager = __decorate([
    Singleton_1.Singleton, 
    __metadata('design:paramtypes', [Feature_1.Feature])
], ConfigurationManager);
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map