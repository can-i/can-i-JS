"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var PackageJsonGetter_1 = require("../Framework/Utilities/Getters/PackageJsonGetter");
var path = require("path");
var expect = chai.expect;
describe("PackageJsonGetter", function () {
    it("should be able find the package.json file of the project", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, expected;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PackageJsonGetter_1.default()];
                    case 1:
                        result = _a.sent();
                        expected = path.resolve(__dirname, "../package.json");
                        expect(result).to.equal(expected);
                        return [2 /*return*/];
                }
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
//# sourceMappingURL=Framework.Utilities.Getters.PackageJsonGetter.js.map