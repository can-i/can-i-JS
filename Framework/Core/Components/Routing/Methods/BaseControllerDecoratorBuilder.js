"use strict";
var tslib_1 = require("tslib");
var DecoratorBuilder_1 = require("../../Decorators/DecoratorBuilder");
var ControllerMethodOptions_1 = require("../../Controllers/Options/ControllerMethodOptions");
var GetControllerMethodOptions_1 = require("../../Controllers/GetControllerMethodOptions");
var ControllerOptions_1 = require("../../Controllers/Options/ControllerOptions");
var GetControllerOptions_1 = require("../../Controllers/GetControllerOptions");
var BaseControllerDecoratorBuilder = (function (_super) {
    tslib_1.__extends(BaseControllerDecoratorBuilder, _super);
    function BaseControllerDecoratorBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseControllerDecoratorBuilder.prototype.getControllerOptions = function (c) {
        return GetControllerOptions_1.default().filter(function (o) {
            return o.klass === c;
        }).reduce(function (prev, next) { return prev || next; }, null) || new ControllerOptions_1.default(c);
    };
    BaseControllerDecoratorBuilder.prototype.getMethodOption = function (constructor, name) {
        return GetControllerMethodOptions_1.default().filter(function (option) {
            return option.klass === constructor;
        }).filter(function (option) {
            return option.method_name === name;
        }).reduce(function (prev, next) { return prev || next; }, null) ||
            new ControllerMethodOptions_1.ControllerMethodOptions(constructor, name);
    };
    return BaseControllerDecoratorBuilder;
}(DecoratorBuilder_1.DecoratorBuilder));
exports.BaseControllerDecoratorBuilder = BaseControllerDecoratorBuilder;
//# sourceMappingURL=BaseControllerDecoratorBuilder.js.map