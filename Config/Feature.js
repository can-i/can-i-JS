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
const index_1 = require('./../Event/index');
const Singleton_1 = require("../IOC/Singleton");
const AppGetter_1 = require('./AppGetter');
let Feature = class Feature extends AppGetter_1.AppGetter {
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
        return index_1.Event.on(...args);
    }
};
Feature = __decorate([
    Singleton_1.Singleton, 
    __metadata('design:paramtypes', [])
], Feature);
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map