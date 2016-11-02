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
const ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
const win_1 = require("../win");
const IOC_1 = require("../IOC");
function Features() {
    return ["documentation"];
}
exports.Features = Features;
function Configure(options = {}) {
    let features = options.features || [];
    for (let f of features) {
        exports.ConfigurationManager.feature.enable(f);
    }
}
exports.Configure = Configure;
let AppGetter = class AppGetter {
    get app() {
        return win_1.App();
    }
};
AppGetter = __decorate([
    IOC_1.Singleton, 
    __metadata('design:paramtypes', [])
], AppGetter);
exports.AppGetter = AppGetter;
let Feature = class Feature extends AppGetter {
    constructor() {
        super();
    }
    convert(f) {
        return `can-i feature ${f}`;
    }
    enable(f) {
        return this.app.enable(this.convert(f));
    }
    enabled(f) {
        return this.app.enabled(this.convert(f));
    }
    disable(f) {
        return this.app.disable(this.convert(f));
    }
    disabled(f) {
        return this.app.disabled(this.convert(f));
    }
    on(...args) {
        return this.app.on(...args);
    }
};
Feature = __decorate([
    IOC_1.Singleton, 
    __metadata('design:paramtypes', [])
], Feature);
let _ConfigurationManager = class _ConfigurationManager extends AppGetter {
    constructor(_feature) {
        super();
        this._feature = _feature;
    }
    get feature() {
        return this._feature;
    }
};
_ConfigurationManager = __decorate([
    IOC_1.Singleton, 
    __metadata('design:paramtypes', [Feature])
], _ConfigurationManager);
exports.ConfigurationManager = ServiceBuilder_1.ServiceBuilder.BuildService(_ConfigurationManager);
//# sourceMappingURL=index.js.map