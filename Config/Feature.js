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
var Event_1 = require("./../Event");
var Singleton_1 = require("../IOC/Singleton");
var AppGetter_1 = require("./AppGetter");
var get_set_box = {};
var Feature = (function (_super) {
    __extends(Feature, _super);
    function Feature() {
        return _super.call(this) || this;
    }
    Feature.prototype.convert = function (f) {
        return "can-i feature " + f;
    };
    Feature.prototype.enable = function (f) {
        this.app.enable(this.convert(f));
        return this;
    };
    Feature.prototype.enabled = function (f) {
        return this.app.enabled(this.convert(f));
    };
    Feature.prototype.disable = function (f) {
        this.app.disable(this.convert(f));
        return this;
    };
    Feature.prototype.disabled = function (f) {
        return this.app.disabled(this.convert(f));
    };
    Feature.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
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
Feature = __decorate([
    Singleton_1.Singleton,
    __metadata("design:paramtypes", [])
], Feature);
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map