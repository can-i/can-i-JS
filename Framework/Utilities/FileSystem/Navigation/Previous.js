"use strict";
var tslib_1 = require("tslib");
var path = require("path");
var promise_lib_1 = require("promise-lib");
var fs = require("fs");
function Previous(folder_or_file_path) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, err, stats;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, folder_or_file_path)];
                case 1:
                    _a = _b.sent(), err = _a[0], stats = _a[1];
                    if (err) {
                        throw err;
                    }
                    else {
                        if (stats.isFile()) {
                            return [2 /*return*/, path.dirname(folder_or_file_path)];
                        }
                        else if (stats.isDirectory()) {
                            return [2 /*return*/, path.resolve(folder_or_file_path, "..")];
                        }
                        else {
                            throw new Error("Unknown file type to handle previous. Not sure how to navigate");
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.Previous = Previous;
function PreviousSync(folder_or_file_path) {
    var stats = fs.statSync(folder_or_file_path);
    if (stats.isFile()) {
        return path.dirname(folder_or_file_path);
    }
    else if (stats.isDirectory()) {
        return path.resolve(folder_or_file_path, "..");
    }
    else {
        throw new Error("Unknown file type to handle previous. Not sure how to navigate");
    }
}
exports.PreviousSync = PreviousSync;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Previous;
//# sourceMappingURL=Previous.js.map