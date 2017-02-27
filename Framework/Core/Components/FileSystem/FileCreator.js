"use strict";
var tslib_1 = require("tslib");
var NodeCreator_1 = require("../../../Contracts/FileSystem/Nodes/NodeCreator");
var fs = require("fs");
var promise_lib_1 = require("promise-lib");
var FileCreator = (function (_super) {
    tslib_1.__extends(FileCreator, _super);
    function FileCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileCreator.prototype.create = function (_path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, err, stats, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, _path)];
                    case 1:
                        _a = _b.sent(), err = _a[0], stats = _a[1];
                        if (!err) return [3 /*break*/, 3];
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.writeFile, _path, "")];
                    case 2:
                        err_1 = (_b.sent())[0];
                        if (err_1) {
                            console.error(err_1.stack);
                            throw err_1;
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileCreator;
}(NodeCreator_1.default));
exports.FileCreator = FileCreator;
//# sourceMappingURL=FileCreator.js.map