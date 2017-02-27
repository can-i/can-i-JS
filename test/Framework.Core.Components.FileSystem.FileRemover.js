"use strict";
var tslib_1 = require("tslib");
var chai = require("chai");
var promise_lib_1 = require("promise-lib");
var fs = require("fs");
var path = require("path");
var os = require("os");
var uuid = require("uuid/v1");
var FileRemover_1 = require("../Framework/Core/Components/FileSystem/FileRemover");
var expect = chai.expect;
describe("FileRemover", function () {
    var filename = path.join(os.tmpdir(), uuid());
    var fr = new FileRemover_1.FileRemover();
    before(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                fs.writeFileSync(filename, "");
                return [2 /*return*/];
            });
        });
    });
    it("should be able to delete the file", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, err, stat;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fr.delete(filename)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, filename)];
                    case 2:
                        _a = _b.sent(), err = _a[0], stat = _a[1];
                        expect(err).to.exist;
                        expect(stat).to.not.exist;
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
//# sourceMappingURL=Framework.Core.Components.FileSystem.FileRemover.js.map