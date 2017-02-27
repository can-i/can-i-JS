"use strict";
var tslib_1 = require("tslib");
var promise_lib_1 = require("promise-lib");
var fs = require("fs");
var path = require("path");
function PackageJsonGetter(root) {
    var _this = this;
    var start = path.resolve(root || __dirname);
    var loop_up = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, err, listing, newstart;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.readdir, start)];
                case 1:
                    _a = _b.sent(), err = _a[0], listing = _a[1];
                    if (err) {
                        throw err;
                    }
                    if (listing.find(function (file) { return file === "package.json"; })) {
                        return [2 /*return*/, path.join(start, "package.json")];
                    }
                    else {
                        newstart = path.resolve(start, "..");
                        if (newstart !== start) {
                            start = newstart;
                            return [2 /*return*/, loop_up()];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return loop_up();
}
exports.PackageJsonGetter = PackageJsonGetter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PackageJsonGetter;
//# sourceMappingURL=PackageJsonGetter.js.map