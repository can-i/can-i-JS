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
const IOC_1 = require("../IOC");
const sinon = require("sinon");
let must = require("must");
describe("ServiceBuilder", function () {
    let method = sinon.spy();
    let method2 = sinon.spy();
    let One = class One {
        constructor() {
            method();
        }
    };
    One = __decorate([
        IOC_1.Singleton, 
        __metadata('design:paramtypes', [])
    ], One);
    let Two = class Two {
        constructor(one) {
            this.one = one;
            method2();
        }
    };
    Two = __decorate([
        IOC_1.Injectable, 
        __metadata('design:paramtypes', [One])
    ], Two);
    beforeEach(function () {
        ServiceBuilder_1.ServiceBuilder.BuildService(Two);
    });
    it("spy two should be called once", function () {
        must(method.calledOnce).true;
        must(method2.calledOnce).true;
    });
    it("spy one should be called twice", function () {
        must(method.calledOnce).true;
        must(method2.callCount).equal(2);
    });
});
//# sourceMappingURL=ServiceBuilder.js.map