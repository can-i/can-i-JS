"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("../Controller");
var Error500Controller_1 = require("./Error500Controller");
var Error200Controller_1 = require("./Error200Controller");
var Error300Controller_1 = require("./Error300Controller");
var Error400Controller_1 = require("./Error400Controller");
var ErrorController = (function (_super) {
    tslib_1.__extends(ErrorController, _super);
    function ErrorController() {
        var _this = _super.call(this) || this;
        _this.Error200 = new Error200Controller_1.Error200Controller();
        _this.Error300 = new Error300Controller_1.Error300Controller();
        _this.Error400 = new Error400Controller_1.Error400Controller();
        _this.Error500 = new Error500Controller_1.Error500Controller();
        return _this;
    }
    ErrorController.prototype.PasstoBase = function (key, v) {
        var errors = [this.Error200, this.Error300, this.Error400, this.Error500];
        errors.forEach(function (error) {
            error[key] = v;
        });
        _super.prototype[key] = v;
    };
    Object.defineProperty(ErrorController.prototype, "req", {
        set: function (v) {
            this.PasstoBase("req", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorController.prototype, "res", {
        set: function (v) {
            this.PasstoBase("res", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorController.prototype, "next", {
        set: function (v) {
            this.PasstoBase("next", v);
        },
        enumerable: true,
        configurable: true
    });
    return ErrorController;
}(Controller_1.CommunicationController));
exports.ErrorController = ErrorController;
//# sourceMappingURL=ErrorController.js.map