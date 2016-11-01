"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const index_1 = require('./../LikeController/index');
const index_2 = require('./../win/index');
const MiddleWare_1 = require("../MiddleWare");
let setter = new index_1.PublicController();
function Route(route = "/") {
    return function RouteAttacher(constructor) {
        let router = index_2.Express.Router();
        let access = index_2.Accessor(constructor);
        let keys = Object.keys(access.methods || {});
        access.route_prefix = route;
        for (let key of keys) {
            let routeOption = access.methods[key];
            for (let o of routeOption) {
                switch (key.toLowerCase()) {
                    case 'get':
                        router.get(o.route_name, o.route_function);
                        break;
                    case 'post':
                        router.post(o.route_name, o.route_function);
                        break;
                }
            }
        }
        index_2.App().use(route, router);
    };
}
exports.Route = Route;
function Get(route = '') {
    return ExtendRequest(route, 'get');
}
exports.Get = Get;
function Post(route = '') {
    return ExtendRequest(route, 'post');
}
exports.Post = Post;
function Put(route = '') {
    return ExtendRequest(route, 'put');
}
exports.Put = Put;
function Use(route = '') {
    return ExtendRequest(route, 'use');
}
exports.Use = Use;
function Checkout(route = '') {
    return ExtendRequest(route, 'checkout');
}
exports.Checkout = Checkout;
function Copy(route = '') {
    return ExtendRequest(route, 'copy');
}
exports.Copy = Copy;
function Delete(route = '') {
    return ExtendRequest(route, 'delete');
}
exports.Delete = Delete;
function Head(route = '') {
    return ExtendRequest(route, 'head');
}
exports.Head = Head;
function Lock(route = '') {
    return ExtendRequest(route, 'lock');
}
exports.Lock = Lock;
function Merge(route = '') {
    return ExtendRequest(route, 'merge');
}
exports.Merge = Merge;
function MkActivity(route = '') {
    return ExtendRequest(route, 'mkactivity');
}
exports.MkActivity = MkActivity;
function MkCol(route = '') {
    return ExtendRequest(route, 'mkcol');
}
exports.MkCol = MkCol;
function Move(route = '') {
    return ExtendRequest(route, 'move');
}
exports.Move = Move;
function MSearch(route = '') {
    return ExtendRequest(route, 'm-search');
}
exports.MSearch = MSearch;
function Notify(route = '') {
    return ExtendRequest(route, 'notify');
}
exports.Notify = Notify;
function ExtendRequest(route, type) {
    return function (target, key, d) {
        let constructor = target.constructor;
        let access = index_2.Accessor(constructor);
        access.methods = access.methods || {};
        let handler = access.methods[type] = (access.methods[type] || []);
        handler.push({
            route_name: route,
            route_function: function (req, res, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let constructor = target.constructor;
                        let access = index_2.Accessor(constructor);
                        if (access.middleware && access.middleware.global && access.middleware.global.length) {
                            let middleware = MiddleWare_1.Stack.apply(this, access.middleware.global);
                            yield new Promise((reject, resolve) => {
                                middleware(req, res, function (response) {
                                    if (response instanceof String) {
                                        next(response);
                                    }
                                    else {
                                        reject(response);
                                    }
                                });
                            });
                        }
                        let controller_instance = new target.constructor();
                        setter.set_up_controller(controller_instance, req, res, next);
                        controller_instance.onInit();
                        if (access.middleware && access.middleware.route && access.middleware.route[key] && access.middleware.route[key].length) {
                            let middleware = MiddleWare_1.Stack.apply(this, access.middleware.route[key]);
                            yield new Promise((reject, resolve) => {
                                middleware(req, res, function (response) {
                                    if (response instanceof String) {
                                        next(response);
                                    }
                                    else {
                                        reject(response);
                                    }
                                });
                            });
                        }
                        let controller_method = controller_instance[key];
                        var injectable_names = Object.keys(access.inject || {});
                        let params = [];
                        if (~injectable_names.indexOf(key)) {
                            params = access.inject[key];
                            params = params.map(function (x) {
                                let instance;
                                try {
                                    instance = new x();
                                }
                                catch (e) {
                                    instance = x;
                                }
                                return instance;
                            });
                        }
                        try {
                            yield Promise.resolve(controller_method.apply(controller_instance, params));
                        }
                        catch (e) {
                            console.log(e.stack);
                            next(e);
                        }
                    }
                    catch (e) {
                        next(e);
                    }
                });
            }
        });
        return d;
    };
}
//# sourceMappingURL=index.js.map