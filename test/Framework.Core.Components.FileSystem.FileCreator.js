"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var os = require("os");
var path = require("path");
var uuid = require("uuid/v1");
var FileCreator_1 = require("../Framework/Core/Components/FileSystem/FileCreator");
var fs = require("fs");
var promise_lib_1 = require("promise-lib");
var expect = chai.expect;
describe("FileCreator", function () {
    var filepath = path.join(os.tmpdir(), uuid());
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fc = new FileCreator_1.FileCreator();
                        return [4 /*yield*/, fc.create(filepath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should be able to create a file", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, err, stat;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, filepath)];
                    case 1:
                        _a = _b.sent(), err = _a[0], stat = _a[1];
                        if (err)
                            throw err;
                        expect(stat.isFile()).to.be.true;
                        return [2 /*return*/];
                }
            });
        });
    });
    after(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                fs.unlinkSync(filepath);
                return [2 /*return*/];
            });
        });
    });
});
//# sourceMappingURL=Framework.Core.Components.FileSystem.FileCreator.js.map