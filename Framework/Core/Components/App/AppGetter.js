"use strict";
var express = require("express");
var Internal_1 = require("../../../Utilities/Internal");
function AppGetter() {
    var root = Internal_1.Root();
    if (!root.App) {
        root.App = express();
    }
    return root.App;
}
exports.AppGetter = AppGetter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppGetter;
//# sourceMappingURL=AppGetter.js.map