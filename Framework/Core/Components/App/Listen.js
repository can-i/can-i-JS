"use strict";
var tslib_1 = require("tslib");
var AppGetter_1 = require("./AppGetter");
var Internal_1 = require("../../../Utilities/Internal");
function Listen() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var App, root, arg1, arg2, arg3, arg4;
        return tslib_1.__generator(this, function (_a) {
            App = AppGetter_1.default();
            root = Internal_1.Root();
            arg1 = args[0], arg2 = args[1], arg3 = args[2], arg4 = args[3];
            root.Server = App.listen(arg1, arg2, arg3, arg4);
            return [2 /*return*/];
        });
    });
}
exports.Listen = Listen;
//# sourceMappingURL=Listen.js.map