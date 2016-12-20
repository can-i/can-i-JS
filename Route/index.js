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
        var binder = new ExpressRouteBinder(route, new ExpressRouterProvider(), Win_1.Accessor(constructor));
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
    RouterProxy.prototype.get = function (url, action) {
        this.router.get(url, action);
    };
    RouterProxy.prototype.post = function (url, action) {
        this.router.post(url, action);
    };
    return RouterProxy;
}());
exports.RouterProxy = RouterProxy;
var ExpressRouterProxy = (function (_super) {
    __extends(ExpressRouterProxy, _super);
    function ExpressRouterProxy() {
        return _super.apply(this, arguments) || this;
    }
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
var ExpressRouteBinder = (function () {
    function ExpressRouteBinder(route, provider, classAccess) {
        this.route = route;
        this.provider = provider;
        this.classAccess = classAccess;
    }
    ExpressRouteBinder.prototype.bind = function () {
        var _this = this;
        var router = this.provider.provide();
        var class_methods_of_options = this.classAccess.methods;
        var keys = Object.keys(class_methods_of_options) || [];
        var _loop_1 = function (key) {
            var router_options = this_1.classAccess.methods[key];
            router_options.forEach(function (router_option) {
                _this.provider.provide()[key](router_option.route_name, router_option.route_function);
            });
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
        }
        if (Win_1.State.Ready) {
            Win_1.App().use(this.route, router.router);
        }
        else {
            Event_1.default.on("can-i:bootstrapped", function () {
                Win_1.App().use(_this.route, router.router);
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
//# sourceMappingURL=index.js.map