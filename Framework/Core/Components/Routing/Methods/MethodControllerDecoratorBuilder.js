"use strict";
var tslib_1 = require("tslib");
var BaseControllerDecoratorBuilder_1 = require("./BaseControllerDecoratorBuilder");
var MethodControllerDecoratorBuilder = (function (_super) {
    tslib_1.__extends(MethodControllerDecoratorBuilder, _super);
    function MethodControllerDecoratorBuilder(_type) {
        var _this = _super.call(this) || this;
        _this._type = _type;
        return _this;
    }
    Object.defineProperty(MethodControllerDecoratorBuilder.prototype, "type", {
        get: function () {
            return this._type.toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    MethodControllerDecoratorBuilder.prototype.onConstructor = function (construct) {
    };
    MethodControllerDecoratorBuilder.prototype.onMethod = function (target, key, pd) {
        var path = this.params[0];
        var mo = this.getMethodOption(target.constructor, key);
        mo.method_type = this.type;
        mo.method_path = path;
        return pd;
    };
    return MethodControllerDecoratorBuilder;
}(BaseControllerDecoratorBuilder_1.BaseControllerDecoratorBuilder));
exports.MethodControllerDecoratorBuilder = MethodControllerDecoratorBuilder;
//# sourceMappingURL=MethodControllerDecoratorBuilder.js.map