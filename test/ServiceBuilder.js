"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _metadata = require("babel-runtime/core-js/reflect/metadata");

var _metadata2 = _interopRequireDefault(_metadata);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof _metadata2.default === "function") return (0, _metadata2.default)(k, v);
};
var Singleton_1 = require('../IOC/Singleton');
var ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
var IOC_1 = require("../IOC");
var sinon = require("sinon");
var must = require("must");
describe("ServiceBuilder", function () {
    var method = sinon.spy();
    var method2 = sinon.spy();
    var One = function One() {
        (0, _classCallCheck3.default)(this, One);

        method();
    };
    One = __decorate([Singleton_1.Singleton, __metadata('design:paramtypes', [])], One);
    var Two = function Two(one) {
        (0, _classCallCheck3.default)(this, Two);

        this.one = one;
        method2();
    };
    Two = __decorate([IOC_1.Injectable, __metadata('design:paramtypes', [One])], Two);
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