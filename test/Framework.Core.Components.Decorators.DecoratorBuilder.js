"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var DecoratorBuilder_1 = require("../Framework/Core/Components/Decorators/DecoratorBuilder");
var expect = chai.expect;
describe("DecoratorBuilder", function () {
    var builder = new DecoratorBuilder_1.DecoratorBuilder();
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                builder.Construct = function (_class) {
                    _class.addition = true;
                };
                builder.Method = function (proto, key, pd) {
                    pd.value = function () {
                        return "hello world";
                    };
                    return pd;
                };
                return [2 /*return*/];
            });
        });
    });
    it("should be able to decorate class constructor", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var decorator, Test;
            return tslib_1.__generator(this, function (_a) {
                decorator = builder.build();
                Test = (function () {
                    function Test() {
                    }
                    Test.prototype.getResult = function () {
                        return null;
                    };
                    return Test;
                }());
                Test = tslib_1.__decorate([
                    decorator
                ], Test);
                expect(Test.addition).to.be.true;
                return [2 /*return*/];
            });
        });
    });
    it("should be able to decorate class methods", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var decorator, Test;
            return tslib_1.__generator(this, function (_a) {
                decorator = builder.build();
                Test = (function () {
                    function Test() {
                    }
                    Test.prototype.getResult = function () {
                        return null;
                    };
                    return Test;
                }());
                tslib_1.__decorate([
                    decorator
                ], Test.prototype, "getResult", null);
                expect("hello world").to.equal(new Test().getResult());
                return [2 /*return*/];
            });
        });
    });
    after(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    });
});
//# sourceMappingURL=Framework.Core.Components.Decorators.DecoratorBuilder.js.map