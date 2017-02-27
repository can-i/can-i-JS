"use strict";
var tslib_1 = require("tslib");
var Node_1 = require("../../../Contracts/FileSystem/Nodes/Node");
var fs = require("fs");
var path = require("path");
var promise_lib_1 = require("promise-lib");
var FileCreator_1 = require("./FileCreator");
var FileRemover_1 = require("./FileRemover");
var FileNode = (function (_super) {
    tslib_1.__extends(FileNode, _super);
    function FileNode(_path, creator, remover) {
        var _this = _super.call(this, creator, remover) || this;
        _this._path = _path;
        return _this;
    }
    Object.defineProperty(FileNode.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (v) {
            this._path = v;
        },
        enumerable: true,
        configurable: true
    });
    FileNode.prototype.GetChildren = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, err, files;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promise_lib_1.CallBack.Call(fs.readdir, this._path)];
                    case 1:
                        _a = _b.sent(), err = _a[0], files = _a[1];
                        if (err)
                            throw err;
                        return [2 /*return*/, (files || []).map(function (file) {
                                return new FileNode(path.join(_this._path, file), _this.creator, _this.remover);
                            })];
                }
            });
        });
    };
    FileNode.Create = function (_path) {
        return new FileNode(_path, new FileCreator_1.FileCreator, new FileRemover_1.FileRemover);
    };
    return FileNode;
}(Node_1.default));
exports.FileNode = FileNode;
//# sourceMappingURL=FileNode.js.map