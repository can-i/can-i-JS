"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var MainController_1 = require("../Framework/Core/Components/Controllers/MainController");
var Get_1 = require("../Framework/Core/Components/Routing/Methods/Get");
var GetControllerMethodOptions_1 = require("../Framework/Core/Components/Controllers/GetControllerMethodOptions");
var expect = chai.expect;
describe("Get Decorator", function () {
    var TestController = (function (_super) {
        tslib_1.__extends(TestController, _super);
        function TestController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestController.prototype.test_method = function () {
        };
        return TestController;
    }(MainController_1.MainController));
    tslib_1.__decorate([
        Get_1.default("/test")
    ], TestController.prototype, "test_method", null);
    var method_options;
    var method_option;
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                method_options = GetControllerMethodOptions_1.default().filter(function (o) {
                    return o.klass === TestController;
                });
                return [2 /*return*/];
            });
        });
    });
    it("should be able to get created method_options", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                expect(method_options).to.have.lengthOf(1);
                method_option = method_options[0];
                return [2 /*return*/];
            });
        });
    });
    it("should be able to get method name", function () {
        expect(method_option.method_name).to.equal("test_method");
    });
    it("should be able to get method path", function () {
        expect(method_option.method_path).to.equal("/test");
    });
    it("should be able to get method type", function () {
        expect(method_option.method_type).to.equal("GET");
    });
    after(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    });
});
//# sourceMappingURL=Framework.Core.Components.Routing.Methods.Get.js.map