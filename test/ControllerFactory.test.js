"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var ControllerFactory_1 = require("../lib/Controller/ControllerFactory");
var index_1 = require("../index");
var expect = chai.expect;
describe("Test", function () {
    var FakeController = (function (_super) {
        tslib_1.__extends(FakeController, _super);
        function FakeController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FakeController;
    }(index_1.default.Controllers.Controller));
    var instance;
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                instance = ControllerFactory_1.ControllerFactory.CreateBaseController(FakeController, {}, {}, function () { });
                return [2 /*return*/];
            });
        });
    });
    it("should create an instance of the Controller Class", function () {
        expect(instance).to.be.an.instanceOf(index_1.default.Controllers.Controller);
    });
});
//# sourceMappingURL=ControllerFactory.test.js.map