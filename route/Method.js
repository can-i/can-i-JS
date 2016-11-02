"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Accessor_1 = require('./../win/Accessor');
const index_1 = require('./../Controller/index');
const ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
const Stack_1 = require("../MiddleWare/Stack");
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
function Options(route = '') {
    return ExtendRequest(route, 'options');
}
exports.Options = Options;
function Patch(route = '') {
    return ExtendRequest(route, 'patch');
}
exports.Patch = Patch;
function Report(route = '') {
    return ExtendRequest(route, 'report');
}
exports.Report = Report;
function Search(route = '') {
    return ExtendRequest(route, 'search');
}
exports.Search = Search;
function Subscribe(route = '') {
    return ExtendRequest(route, 'subscribe');
}
exports.Subscribe = Subscribe;
function Trace(route = '') {
    return ExtendRequest(route, 'trace');
}
exports.Trace = Trace;
function Unlock(route = '') {
    return ExtendRequest(route, 'unlock');
}
exports.Unlock = Unlock;
function unsubscribe(route = '') {
    return ExtendRequest(route, 'unsubscribe');
}
exports.unsubscribe = unsubscribe;
function ExtendRequest(route, type) {
    return function (target, key, d) {
        let constructor = target.constructor;
        let access = Accessor_1.Accessor(constructor);
        access.methods = access.methods || {};
        let handler = access.methods[type] = (access.methods[type] || []);
        handler.push({
            route_name: route,
            route_function: function (req, res, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let constructor = target.constructor;
                        let access = Accessor_1.Accessor(constructor);
                        if (access.middleware && access.middleware.global && access.middleware.global.length) {
                            let middleware = Stack_1.Stack.apply(this, access.middleware.global);
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
                        let controller_instance = ServiceBuilder_1.ServiceBuilder.ConstructService(constructor);
                        let setter = new index_1.ControllerConfig();
                        setter.set_up_controller(controller_instance, req, res, next);
                        controller_instance.onInit();
                        if (access.middleware && access.middleware.route && access.middleware.route[key] && access.middleware.route[key].length) {
                            let middleware = Stack_1.Stack.apply(this, access.middleware.route[key]);
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
                        let params = [];
                        params = ServiceBuilder_1.ServiceBuilder.getServiceMethodNeeds(target, key);
                        try {
                            yield Promise.resolve((controller_instance[key](...params)));
                        }
                        catch (e) {
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
//# sourceMappingURL=Method.js.map