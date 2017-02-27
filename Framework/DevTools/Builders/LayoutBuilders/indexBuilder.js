"use strict";
var tslib_1 = require("tslib");
var Builder_1 = require("../../../Contracts/Builders/Builder");
var promise_lib_1 = require("promise-lib");
var fs = require("fs");
var path = require("path");
var IndexBuilder = (function (_super) {
    tslib_1.__extends(IndexBuilder, _super);
    function IndexBuilder(_path) {
        var _this = _super.call(this) || this;
        _this._path = _path;
        return _this;
    }
    IndexBuilder.prototype.build = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, err, files, full_dirs, p, p_stats, imports_and_export, len, ii, filename, full_path, stat, i_and_c, file_parts, text;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.readdir, this._path)];
                    case 1:
                        _a = _b.sent(), err = _a[0], files = _a[1];
                        if (err)
                            throw err;
                        full_dirs = files.map(function (file) {
                            return path.join(_this._path, file);
                        });
                        p = new promise_lib_1.PArray(full_dirs);
                        return [4 /*yield*/, p.map(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var _a, err, stat;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.stat, item)];
                                        case 1:
                                            _a = _b.sent(), err = _a[0], stat = _a[1];
                                            if (err)
                                                throw err;
                                            return [2 /*return*/, stat];
                                    }
                                });
                            }); })];
                    case 2:
                        p_stats = _b.sent();
                        imports_and_export = [];
                        len = files.length, ii = 0;
                        _b.label = 3;
                    case 3:
                        if (!(ii < len)) return [3 /*break*/, 9];
                        filename = files[ii];
                        full_path = full_dirs[ii];
                        stat = p_stats.data[ii];
                        i_and_c = void 0;
                        if (!stat.isDirectory()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.onFolder(filename, full_path, stat)];
                    case 4:
                        i_and_c = _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(!/d\.ts$/.test(filename) && /\.ts/.test(filename) && !/index\.ts/.test(filename))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.onFile(filename, full_path, stat)];
                    case 6:
                        i_and_c = _b.sent();
                        _b.label = 7;
                    case 7:
                        if (typeof i_and_c !== "undefined")
                            imports_and_export.push(i_and_c);
                        _b.label = 8;
                    case 8:
                        ii++;
                        return [3 /*break*/, 3];
                    case 9:
                        try {
                            file_parts = imports_and_export.reduce(function (ic_str, iandc) {
                                var i = ic_str[0], c = ic_str[1];
                                var _i = iandc[0], _c = iandc[1];
                                i += _i;
                                if (c) {
                                    c += ",\n";
                                }
                                c += _c;
                                return [i, c];
                            });
                            file_parts[1] = "export default {" + file_parts[1] + "};";
                            text = file_parts.join("\n");
                            fs.writeFile(path.resolve(this._path, "index.ts"), text, function (err) {
                                if (err)
                                    throw err;
                            });
                        }
                        catch (e) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexBuilder.prototype.buildIndexFile = function (filename, full_path, stat) {
        filename = stat.isDirectory() ? filename : filename.replace(/\.ts$/, "");
        var imports = "\n            import * as " + filename + " from './" + filename + "'\n        ";
        var _class = "" + filename;
        return [imports, _class];
    };
    IndexBuilder.prototype.onFolder = function (filename, fullpath, stat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ib;
            return tslib_1.__generator(this, function (_a) {
                ib = new IndexBuilder(fullpath);
                ib.build();
                return [2 /*return*/, this.buildIndexFile(filename, fullpath, stat)];
            });
        });
    };
    IndexBuilder.prototype.onFile = function (filename, fullpath, stat) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.buildIndexFile(filename, fullpath, stat)];
            });
        });
    };
    return IndexBuilder;
}(Builder_1.default));
exports.IndexBuilder = IndexBuilder;
//# sourceMappingURL=indexBuilder.js.map