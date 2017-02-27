"use strict";
var tslib_1 = require("tslib");
var ControllerOptions_1 = require("./ControllerOptions");
var ControllerMethodOptions = (function (_super) {
    tslib_1.__extends(ControllerMethodOptions, _super);
    function ControllerMethodOptions(klass, name) {
        var _this = _super.call(this, klass) || this;
        _this.method_name = name;
        return _this;
    }
    return ControllerMethodOptions;
}(ControllerOptions_1.ControllerOptions));
exports.ControllerMethodOptions = ControllerMethodOptions;
//# sourceMappingURL=ControllerMethodOptions.js.map