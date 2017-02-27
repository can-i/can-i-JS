"use strict";
var tslib_1 = require("tslib");
var Builder_1 = require("../../../Contracts/Builders/Builder");
var genErr = new Error("General Failure");
var DecoratorBuilder = (function (_super) {
    tslib_1.__extends(DecoratorBuilder, _super);
    function DecoratorBuilder() {
        var _this = _super.call(this) || this;
        _this.Construct = _this.onConstructor;
        _this.Method = _this.onMethod;
        return _this;
    }
    Object.defineProperty(DecoratorBuilder.prototype, "params", {
        get: function () {
            return this._params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecoratorBuilder.prototype, "Construct", {
        get: function () {
            return this.constructorAction;
        },
        set: function (constructorAction) {
            this.constructorAction = constructorAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecoratorBuilder.prototype, "Method", {
        get: function () {
            return this.methodAction;
        },
        set: function (methodAction) {
            this.methodAction = methodAction;
        },
        enumerable: true,
        configurable: true
    });
    DecoratorBuilder.prototype.build = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._params = args;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length === 1) {
                return _this.Construct(args[0]);
            }
            else if (args.length === 3) {
                var arg0 = (typeof args[0] === "object");
                var arg1 = (typeof args[1] === "string");
                if (arg0 && arg1) {
                    _this.Method(args[0], args[1], args[2]);
                }
                else {
                    //error
                    throw genErr;
                }
            }
            else {
                //error
                throw genErr;
            }
        };
    };
    return DecoratorBuilder;
}(Builder_1.default));
exports.DecoratorBuilder = DecoratorBuilder;
//# sourceMappingURL=DecoratorBuilder.js.map