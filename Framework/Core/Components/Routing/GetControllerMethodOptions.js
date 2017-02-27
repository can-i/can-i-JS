"use strict";
var Internal_1 = require("../../../Utilities/Internal");
var ControllerMethodOptions_1 = require("../Controllers/Options/ControllerMethodOptions");
var root = Internal_1.Root();
function GetControllerMethodOptions() {
    return root.ControllerOptions.filter(function (option) {
        return option instanceof ControllerMethodOptions_1.ControllerMethodOptions;
    });
}
exports.GetControllerMethodOptions = GetControllerMethodOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetControllerMethodOptions;
//# sourceMappingURL=GetControllerMethodOptions.js.map