"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require("reflect-metadata");
var Express = require("express");
var Path = require("path");
var glob = require("glob");
var Boot_1 = require("../Work/Boot");
var Log_1 = require("../Utility/Log");
var SimpleLog_1 = require("../../ubungo/log/SimpleLog");
var Ready_1 = require("./Ready");
var Constant_1 = require("./Constant");
var key = "__GLOBAL__UBUNGO__SERVER_INSTANCE";
var ExpressServer = (function () {
    function ExpressServer() {
    }
    Object.defineProperty(ExpressServer.prototype, "App", {
        get: function () {
            return Constant_1.Constant.set("EXPRESS", Express());
        },
        enumerable: true,
        configurable: true
    });
    ExpressServer.prototype.Listen = function (port, callback) {
        return this.httpServer = Constant_1.Constant.set("__GLOBAL_EXPRESS_SERVER_LISTEN", this.App.listen(port, callback));
    };
    ExpressServer.prototype.enable = function (feature) {
        Log_1.AppLog.info("enabling " + feature);
        this.App.enable(feature);
    };
    ExpressServer.prototype.disable = function (feature) {
        Log_1.AppLog.info("disabling " + feature);
        this.App.disable(feature);
    };
    ExpressServer.prototype.enabled = function (feature) {
        return this.App.enabled(feature);
    };
    ExpressServer.prototype.disabled = function (feature) {
        return this.App.disabled(feature);
    };
    ExpressServer.prototype.close = function () {
        this.httpServer.close();
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
var ExpressServerProvider = (function () {
    function ExpressServerProvider() {
    }
    ExpressServerProvider.prototype.provide = function () {
        return new ExpressServer();
    };
    return ExpressServerProvider;
}());
var AbstractFeatureLoader = (function () {
    function AbstractFeatureLoader(serverProvider) {
        this.serverProvider = serverProvider;
    }
    Object.defineProperty(AbstractFeatureLoader.prototype, "App", {
        get: function () {
            return Constant_1.Constant.set("SERVER_PROVIDER_FEATURE_KEY", this.serverProvider.provide());
        },
        enumerable: true,
        configurable: true
    });
    AbstractFeatureLoader.prototype.enable = function (feature) {
        feature = this.convert(feature);
        this.App.enable(feature);
    };
    AbstractFeatureLoader.prototype.disable = function (feature) {
        feature = this.convert(feature);
        this.App.disable(feature);
    };
    AbstractFeatureLoader.prototype.enabled = function (feature) {
        feature = this.convert(feature);
        return this.App.enabled(feature);
    };
    AbstractFeatureLoader.prototype.disabled = function (feature) {
        feature = this.convert(feature);
        return this.App.disabled(feature);
    };
    return AbstractFeatureLoader;
}());
exports.AbstractFeatureLoader = AbstractFeatureLoader;
var ExpressFeatureLoader = (function (_super) {
    __extends(ExpressFeatureLoader, _super);
    function ExpressFeatureLoader() {
        return _super.apply(this, arguments) || this;
    }
    ExpressFeatureLoader.prototype.load = function (config) {
        var server = this.serverProvider.provide();
    };
    ExpressFeatureLoader.prototype.convert = function (feature) {
        return "can-i/feature " + feature;
    };
    return ExpressFeatureLoader;
}(AbstractFeatureLoader));
exports.ExpressFeatureLoader = ExpressFeatureLoader;
var ExpressBootStrapInterpreter = (function () {
    function ExpressBootStrapInterpreter(serverProvider, featureLoader) {
        this.serverProvider = serverProvider;
        this.featureLoader = featureLoader;
    }
    ExpressBootStrapInterpreter.prototype.parse = function (config) {
        //#region Base Default options
        if (config !== null) {
            config = config || {};
            config.engine = config.engine || {};
            //#endregion
            var app = this.serverProvider.provide();
            var controllers = Path.join(process.cwd(), "controllers");
            var services = Path.join(process.cwd(), "services");
            var views = Path.join(process.cwd(), "views");
            var engine = {
                extension: "html",
                engineName: "vash",
                engineConfig: null
            };
            var default_config = { controllers: controllers, services: services, views: views, engine: engine };
            config.engine = __assign({}, default_config.engine, config.engine);
            config = __assign({}, default_config, config);
            this.loadControllers(config);
            this.loadServices(config);
            this.loadFeatures(config);
        }
        else {
        }
    };
    ExpressBootStrapInterpreter.prototype.loadControllers = function (config) {
        this.loadFolder(config.controllers);
    };
    ExpressBootStrapInterpreter.prototype.loadServices = function (config) {
        this.loadFolder(config.services);
    };
    ExpressBootStrapInterpreter.prototype.loadFeatures = function (config) {
    };
    ExpressBootStrapInterpreter.prototype.loadFolder = function (folder) {
        if (folder) {
            var files = this.getFolderFiles(folder);
            files.forEach(require);
        }
    };
    ExpressBootStrapInterpreter.prototype.getFolderFiles = function (folder) {
        var resolve;
        var reject;
        var folders = [];
        folders = glob.sync(folder + "/**/*.js");
        return folders;
    };
    return ExpressBootStrapInterpreter;
}());
exports.ExpressBootStrapInterpreter = ExpressBootStrapInterpreter;
//#endregion
var SERVER_INSTANCE_KEY = "GLOBAL_SERVER_INSTANCE_KEY";
var SERVER_PROVIDER_PROVIDE_KEY = "SERVER_PROVIDER_PROVIDE_KEY";
var ExpressBasedApplication = (function () {
    function ExpressBasedApplication(serverProvider, interpreter, readyProvider) {
        this.serverProvider = serverProvider;
        this.interpreter = interpreter;
        this.readyProvider = readyProvider;
        //#region Setup
        Log_1.AppLog.info("ExpressBased Application Created");
        //#endregion
        this.server = Constant_1.Constant.set(SERVER_PROVIDER_PROVIDE_KEY, this.serverProvider.provide());
    }
    ExpressBasedApplication.prototype.BootStrap = function (config) {
        if (config !== null)
            this.interpreter.parse(config);
        this.readyProvider.Ready();
    };
    ExpressBasedApplication.prototype.Listen = function (port, callback) {
        var _this = this;
        try {
            var server_instance = this.server.Listen(port, function () {
                SimpleLog_1.Applog.info("Application Listening started");
                callback();
                Boot_1.default();
                _this.readyProvider.Ready();
            });
        }
        catch (e) {
        }
        return this.server_instance = Constant_1.Constant.set("__GLOBAL_APPLICATION_LISTEN", server_instance);
    };
    ExpressBasedApplication.prototype.Close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.server.close();
                return [2 /*return*/];
            });
        });
    };
    ExpressBasedApplication.prototype.onReady = function (callback) {
        this.readyProvider.OnReady(function () {
            callback();
        });
    };
    return ExpressBasedApplication;
}());
exports.ExpressBasedApplication = ExpressBasedApplication;
//#region Factory
var ApplicationFactory = (function () {
    function ApplicationFactory() {
    }
    ApplicationFactory.ExpressApplication = function () {
        var serverProvider = new ExpressServerProvider();
        var featureLoader = new ExpressFeatureLoader(serverProvider);
        var bootstrapInterpreter = new ExpressBootStrapInterpreter(serverProvider, featureLoader);
        var ReadyProvider = new Ready_1.Ready();
        return new ExpressBasedApplication(serverProvider, bootstrapInterpreter, ReadyProvider);
    };
    return ApplicationFactory;
}());
exports.ApplicationFactory = ApplicationFactory;
//#endregion 
//# sourceMappingURL=Application.js.map