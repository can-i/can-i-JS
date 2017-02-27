"use strict";
var tslib_1 = require("tslib");
var Builder_1 = require("./Builder");
var DecoratorBuilder = (function (_super) {
    tslib_1.__extends(DecoratorBuilder, _super);
    function DecoratorBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DecoratorBuilder.prototype, "Construct", {
        set: function (constructorAction) {
        },
        enumerable: true,
        configurable: true
    });
    return DecoratorBuilder;
}(Builder_1.Builder));
exports.DecoratorBuilder = DecoratorBuilder;
//# sourceMappingURL=DecoratorBuilder.js.map