"use strict";
var tslib_1 = require("tslib");
var LayoutBuilder_1 = require("./LayoutBuilder");
var FolderLayoutBuilder_1 = require("./FolderLayoutBuilder");
var FileLayoutBuilder_1 = require("./FileLayoutBuilder");
function Creator(root, settings) {
    return new FileSystemBuilder(root, settings, new FolderLayoutBuilder_1.default(root, settings), new FileLayoutBuilder_1.default(root, settings));
}
exports.Creator = Creator;
var FileSystemBuilder = (function (_super) {
    tslib_1.__extends(FileSystemBuilder, _super);
    function FileSystemBuilder(root_directory, settings, folderLayoutBuilder, fileLayoutBuilder) {
        var _this = _super.call(this, root_directory, settings) || this;
        _this.folderLayoutBuilder = folderLayoutBuilder;
        _this.fileLayoutBuilder = fileLayoutBuilder;
        //disable the actions so that it can be controlled;
        _this.folderLayoutBuilder.onItemFoundAction = LayoutBuilder_1.default.prototype.onItemAction;
        _this.fileLayoutBuilder.onItemFoundAction = LayoutBuilder_1.default.prototype.onItemAction;
        _this.onItemFoundAction = _this.onItemAction;
        return _this;
    }
    FileSystemBuilder.prototype.onItemAction = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.folderLayoutBuilder.onItemAction(item)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fileLayoutBuilder.onItemAction(item)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileSystemBuilder;
}(LayoutBuilder_1.default));
exports.FileSystemBuilder = FileSystemBuilder;
//# sourceMappingURL=FileSystemBuilder.js.map