"use strict";
var tslib_1 = require("tslib");
/**
 * This creator pattern will be seen alot through out this framework.
 * This will make it easy to Create a class without having to know exactly
 * what it needs to function.
 *
 * This will be useful.
 */
function Creator(root_directory, settings) {
    return new LayoutBuilder(root_directory, settings);
}
exports.Creator = Creator;
var LayoutBuilder = (function () {
    function LayoutBuilder(_root_directory, _settings) {
        this._root_directory = _root_directory;
        this._settings = _settings;
        this.onItemFoundAction = this.onItemAction;
    }
    Object.defineProperty(LayoutBuilder.prototype, "root_directory", {
        get: function () {
            return this._root_directory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayoutBuilder.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    LayoutBuilder.prototype.onItemAction = function (item) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LayoutBuilder.prototype.FindItem = function (settings, name) {
        if (name === void 0) { name = ""; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var steps, _i, steps_1, step, stepname, data, namedata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        steps = this.GetSteps(settings);
                        _i = 0, steps_1 = steps;
                        _a.label = 1;
                    case 1:
                        if (!(_i < steps_1.length)) return [3 /*break*/, 5];
                        step = steps_1[_i];
                        stepname = void 0;
                        if (name) {
                            stepname = name + "." + step;
                        }
                        else {
                            stepname = step;
                        }
                        data = settings[step];
                        namedata = {
                            name: stepname,
                            data: data
                        };
                        if (!this.onItemFoundAction) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onItemFoundAction(namedata)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        if (typeof data === "object") {
                            this.FindItem(data, stepname);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LayoutBuilder.prototype.GetSteps = function (object) {
        var keys = Object.keys(object);
        return keys;
    };
    LayoutBuilder.prototype.onItemFound = function (onItemFoundAction) {
        this.onItemFoundAction = onItemFoundAction;
    };
    LayoutBuilder.prototype.Run = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.FindItem(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LayoutBuilder;
}());
exports.LayoutBuilder = LayoutBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayoutBuilder;
//# sourceMappingURL=LayoutBuilder.js.map