"use strict";
var tslib_1 = require("tslib");
var LayoutBuilder_1 = require("./LayoutBuilder");
var path = require("path");
var fs = require("fs");
var promise_lib_1 = require("promise-lib");
var MainLogger_1 = require("../../Log/MainLogger");
var log = MainLogger_1.MainLogger.extend("FileLayoutBuilder", {
    tags: ["builder", "file"]
});
function Creator(root_directory, settings) {
    //might do some extra things
    return new FileLayoutBuilder(root_directory, settings);
}
exports.Creator = Creator;
var FileLayoutBuilder = (function (_super) {
    tslib_1.__extends(FileLayoutBuilder, _super);
    function FileLayoutBuilder(root_directory, settings) {
        return _super.call(this, root_directory, settings) || this;
    }
    FileLayoutBuilder.prototype.onItemAction = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof item.data === "boolean")) return [3 /*break*/, 2];
                        debugger;
                        //Create file
                        return [4 /*yield*/, this.CreateFile(this.root_directory, item.name)];
                    case 1:
                        //Create file
                        _a.sent();
                        log.info("Create file " + this.CreateFilePath(this.root_directory, item.name));
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
       * This creates the needed folder from the layout settings
       */
    FileLayoutBuilder.prototype.CreateFile = function (root, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filepath, _a, err, stats, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filepath = this.CreateFilePath(root, name);
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, filepath)];
                    case 1:
                        _a = _b.sent(), err = _a[0], stats = _a[1];
                        if (!err) return [3 /*break*/, 3];
                        return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.writeFile, filepath, "", {
                                encoding: "utf8",
                                flag: "w"
                            })];
                    case 2:
                        err_1 = (_b.sent())[0];
                        if (err_1) {
                            //problem writing the file
                            throw err_1;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (stats.isDirectory()) {
                        }
                        else if (stats.isFile()) {
                        }
                        else {
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileLayoutBuilder.prototype.CreateFilePath = function (root, name) {
        var structure = name.split(".");
        var ext = structure.pop();
        var namepath = structure.join(path.sep);
        namepath = namepath + "." + ext;
        return path.join(root, namepath);
    };
    return FileLayoutBuilder;
}(LayoutBuilder_1.default));
exports.FileLayoutBuilder = FileLayoutBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileLayoutBuilder;
//# sourceMappingURL=FileLayoutBuilder.js.map