"use strict";
var tslib_1 = require("tslib");
var NodeRemover_1 = require("../../../Contracts/FileSystem/Nodes/NodeRemover");
var promise_lib_1 = require("promise-lib");
var fs = require("fs");
var FileRemover = (function (_super) {
    tslib_1.__extends(FileRemover, _super);
    function FileRemover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileRemover.prototype.delete = function (_path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.unlink, _path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileRemover;
}(NodeRemover_1.default));
exports.FileRemover = FileRemover;
//# sourceMappingURL=FileRemover.js.map