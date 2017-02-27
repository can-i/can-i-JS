"use strict";
var tslib_1 = require("tslib");
var LayoutBuilder_1 = require("./LayoutBuilder");
var mkdirp = require("mkdirp");
var path = require("path");
var fs = require("fs");
var promise_lib_1 = require("promise-lib");
var MainLogger_1 = require("../../Log/MainLogger");
var log = MainLogger_1.MainLogger.extend("FolderLayoutBuilder", {
    tags: ["folderLayoutBuilder"]
});
function Creator(root_directory, settings) {
    log.info("Factory creating \"" + FolderLayoutBuilder.name + "\"");
    //might do some extra things
    return new FolderLayoutBuilder(root_directory, settings);
}
exports.Creator = Creator;
var FolderLayoutBuilder = (function (_super) {
    tslib_1.__extends(FolderLayoutBuilder, _super);
    function FolderLayoutBuilder(root_directory, settings) {
        return _super.call(this, root_directory, settings) || this;
    }
    FolderLayoutBuilder.prototype.onItemAction = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof item.data === "object")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.CreateFolder(this.root_directory, item.name)];
                    case 1:
                        _a.sent();
                        log.info("Created Folder " + this.CreateFolderPath(this.root_directory, item.name));
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This creates the needed folder from the layout settings
     */
    FolderLayoutBuilder.prototype.CreateFolder = function (root, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var folderpath, _a, err, stats, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        folderpath = this.CreateFolderPath(root, name);
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, folderpath)];
                    case 1:
                        _a = _b.sent(), err = _a[0], stats = _a[1];
                        if (!err) return [3 /*break*/, 3];
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(mkdirp, folderpath)];
                    case 2:
                        err_1 = (_b.sent())[0];
                        if (err_1) {
                            throw err_1;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (stats.isFile()) {
                        }
                        else if (stats.isDirectory()) {
                        }
                        else {
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FolderLayoutBuilder.prototype.CreateFolderPath = function (root, name) {
        log.info("root: " + root + " name: " + name);
        var namepath = name ? name.replace(/\./g, path.sep) : "";
        return path.join(root, namepath);
    };
    return FolderLayoutBuilder;
}(LayoutBuilder_1.default));
exports.FolderLayoutBuilder = FolderLayoutBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FolderLayoutBuilder;
//# sourceMappingURL=FolderLayoutBuilder.js.map