"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Win_1 = require("./../Win");
var LikeController_1 = require("./../LikeController");
var Event_1 = require("../Event");
var Log_1 = require("../Utility/Log");
function Route(route) {
    if (route === void 0) { route = "/"; }
    Log_1.RouteLog.info("new route: " + route);
    return function RouteAttacher(constructor) {
        /**
                Every class will have it's individual access object.
                The Access Object is unique to every controller.
                So using the access it can gain access to specific controller settings
         */
        var class_accessor = Win_1.Accessor(constructor);
        var binder = RouteBindingFactory.ExpressRouteBinder(route, constructor);
        // let binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Accessor(constructor));
        binder.bind();
    };
}
exports.Route = Route;
var setter = new LikeController_1.ControllerConfig();
var RouterProxy = (function () {
    function RouterProxy(provider) {
        this.provider = provider;
    }
    Object.defineProperty(RouterProxy.prototype, "proxyRouter", {
        get: function () {
            if (!this._proxyRouter) {
                this._proxyRouter = this.provider.provide();
            }
            return this._proxyRouter;
        },
        enumerable: true,
        configurable: true
    });
    return RouterProxy;
}());
exports.RouterProxy = RouterProxy;
var ExpressRouterProxy = (function (_super) {
    __extends(ExpressRouterProxy, _super);
    function ExpressRouterProxy() {
        return _super.apply(this, arguments) || this;
    }
    ExpressRouterProxy.prototype.get = function (url, action) {
        this.router.get(url, action);
    };
    ExpressRouterProxy.prototype.post = function (url, action) {
        this.router.post(url, action);
    };
    Object.defineProperty(ExpressRouterProxy.prototype, "router", {
        get: function () {
            if (!this._router) {
                this._router = Win_1.Express.Router();
            }
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    return ExpressRouterProxy;
}(RouterProxy));
exports.ExpressRouterProxy = ExpressRouterProxy;
//TODO I need to find a way to not be so bounded to express;
//I wanted express as a quick setup and not as a fully tied to framework
//Design solution is needed here
var ExpressRouteBinder = (function () {
    function ExpressRouteBinder(route, provider, classAccess, app_provider, stateProvider) {
        this.route = route;
        this.provider = provider;
        this.classAccess = classAccess;
        this.app_provider = app_provider;
        this.stateProvider = stateProvider;
    }
    ExpressRouteBinder.prototype.bind = function () {
        var _this = this;
        //The express router object
        var router = this.provider.provide();
        var class_methods_of_options = this.classAccess.methods;
        var keys = Object.keys(class_methods_of_options) || [];
        var _loop_1 = function (key) {
            var router_options = this_1.classAccess.methods[key];
            router_options.forEach(function (router_option) {
                router[key](router_option.route_name, router_option.route_function);
            });
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
        if (this.stateProvider.getState().Ready) {
            var App_1 = this.app_provider.getApp();
            App_1.use(this.route, router.router);
        }
        else {
            Event_1.default.on("can-i:bootstrapped", function () {
                var App = _this.app_provider.getApp();
                App.use(_this.route, router.router);
            });
        }
    };
    return ExpressRouteBinder;
}());
exports.ExpressRouteBinder = ExpressRouteBinder;
var RouterProvider = (function () {
    function RouterProvider() {
    }
    return RouterProvider;
}());
exports.RouterProvider = RouterProvider;
var ExpressRouterProvider = (function (_super) {
    __extends(ExpressRouterProvider, _super);
    function ExpressRouterProvider() {
        return _super.apply(this, arguments) || this;
    }
    ExpressRouterProvider.prototype.provide = function () {
        return new ExpressRouterProxy(this);
    };
    return ExpressRouterProvider;
}(RouterProvider));
exports.ExpressRouterProvider = ExpressRouterProvider;
var RouteBindingFactory = (function () {
    function RouteBindingFactory() {
    }
    RouteBindingFactory.ExpressRouteBinder = function (route, constructor) {
        var binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Win_1.Accessor(constructor), new ExpressAppProvider(), new ExpressStateProvider);
        return binder;
    };
    return RouteBindingFactory;
}());
exports.RouteBindingFactory = RouteBindingFactory;
var ExpressAppProvider = (function () {
    function ExpressAppProvider() {
    }
    ExpressAppProvider.prototype.getApp = function () {
        return Win_1.App();
    };
    return ExpressAppProvider;
}());
exports.ExpressAppProvider = ExpressAppProvider;
var ExpressStateProvider = (function () {
    function ExpressStateProvider() {
    }
    ExpressStateProvider.prototype.getState = function () {
        return Win_1.State;
    };
    return ExpressStateProvider;
}());
exports.ExpressStateProvider = ExpressStateProvider;
//# sourceMappingURL=index.js.map