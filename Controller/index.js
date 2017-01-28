"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Win_1 = require("../Win");
var Config_1 = require("./../Config");
/**
 * The Controller is the lowest form of the Controller classes.
 * This is used to give the default properties that every
 * controller expects to have.
 * The req,res and next variables
 */
var Controller = (function () {
    function Controller() {
    }
    return Controller;
}());
exports.Controller = Controller;
/**
 * This class is used internally to help with the instanciation of
 * a new controller. It allows the protected fields.
 * req,res and next to be set.
 */
var ControllerConfig = (function (_super) {
    __extends(ControllerConfig, _super);
    function ControllerConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControllerConfig.prototype.set_up_controller = function (controller, req, res, next) {
        var c = controller;
        c.req = req;
        c.res = res;
        c.next = next;
    };
    return ControllerConfig;
}(Controller));
exports.ControllerConfig = ControllerConfig;
/**
 * The BaseController is the controller that users will use in order
 * to extend and create there own controllers.
 *
 * It provides access to basic things that a user might find useful.
 */
var BaseController = (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        var _this = _super.call(this) || this;
        _this.internal_options = {};
        return _this;
    }
    Object.defineProperty(BaseController.prototype, "ConfigurationManager", {
        /**
         * Access to the Configuration Manager
         */
        get: function () {
            return Config_1.configurationManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "Server", {
        /**
         * Access to the running instance of the server.
         */
        get: function () {
            return Win_1.GetServer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "App", {
        /**
         * Access to the App Instance that was created from Express
         */
        get: function () {
            return Win_1.App();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "features", {
        get: function () {
            return this.ConfigurationManager.feature;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "session", {
        get: function () {
            return this.req.session;
        },
        set: function (val) {
            this.req.session = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "body", {
        get: function () {
            return this.req.body;
        },
        enumerable: true,
        configurable: true
    });
    BaseController.prototype.onInit = function () {
    };
    BaseController.prototype.sendFile = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.res.sendFile.apply(this.res, args);
    };
    BaseController.prototype.status = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.res.status.apply(this.res, args);
    };
    BaseController.prototype.render = function (data) {
        return this.res.render(data);
    };
    BaseController.prototype.send = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.internal_options.render) {
            return this.render.apply(this, [this.internal_options.renderPage].concat(args));
        }
        else {
            this.res.send.apply(this.res, args);
        }
    };
    return BaseController;
}(Controller));
/**
 *
 */
BaseController.methods = {};
exports.BaseController = BaseController;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=index.js.map