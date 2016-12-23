"use strict";
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
var Accessor_1 = require("./../Win/Accessor");
var Controller_1 = require("./../Controller");
var ServiceBuilder_1 = require("./../IOC/ServiceBuilder");
var Stack_1 = require("../MiddleWare/Stack");
function Get(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'get');
}
exports.Get = Get;
function Post(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'post');
}
exports.Post = Post;
function Put(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'put');
}
exports.Put = Put;
function Use(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'use');
}
exports.Use = Use;
function Checkout(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'checkout');
}
exports.Checkout = Checkout;
function Copy(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'copy');
}
exports.Copy = Copy;
function Delete(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'delete');
}
exports.Delete = Delete;
function Head(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'head');
}
exports.Head = Head;
function Lock(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'lock');
}
exports.Lock = Lock;
function Merge(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'merge');
}
exports.Merge = Merge;
function MkActivity(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'mkactivity');
}
exports.MkActivity = MkActivity;
function MkCol(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'mkcol');
}
exports.MkCol = MkCol;
function Move(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'move');
}
exports.Move = Move;
function MSearch(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'm-search');
}
exports.MSearch = MSearch;
function Notify(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'notify');
}
exports.Notify = Notify;
function Options(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'options');
}
exports.Options = Options;
function Patch(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'patch');
}
exports.Patch = Patch;
function Report(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'report');
}
exports.Report = Report;
function Search(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'search');
}
exports.Search = Search;
function Subscribe(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'subscribe');
}
exports.Subscribe = Subscribe;
function Trace(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'trace');
}
exports.Trace = Trace;
function Unlock(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'unlock');
}
exports.Unlock = Unlock;
function unsubscribe(route) {
    if (route === void 0) { route = ''; }
    return ExtendRequest(route, 'unsubscribe');
}
exports.unsubscribe = unsubscribe;
function ExtendRequest(route, type) {
    //TODO clean up this mess
    return function (target, key, d) {
        var constructor = target.constructor;
        var access = Accessor_1.Accessor(constructor);
        access.methods = access.methods || {};
        var handler = access.methods[type] = (access.methods[type] || []);
        handler.push({
            route_name: route,
            route_function: function (req, res, next) {
                return __awaiter(this, void 0, void 0, function () {
                    var constructor_1, access_1, middleware_1, controller_instance, args, setter, middleware_2, params, e_1, e_2, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 10, , 11]);
                                constructor_1 = target.constructor;
                                access_1 = Accessor_1.Accessor(constructor_1);
                                if (!(access_1.middleware && access_1.middleware.global && access_1.middleware.global.length))
                                    return [3 /*break*/, 2];
                                middleware_1 = Stack_1.Stack.apply(this, access_1.middleware.global);
                                //TODO why the reject
                                return [4 /*yield*/, new Promise(function (reject, resolve) {
                                        //TODO next with a string is an error, don't know why i did that
                                        middleware_1(req, res, function (response) {
                                            if (response instanceof String) {
                                                next(response);
                                            }
                                            else {
                                                reject(response);
                                            }
                                        });
                                    })];
                            case 1:
                                //TODO why the reject
                                _b.sent();
                                _b.label = 2;
                            case 2:
                                controller_instance = void 0;
                                if (access_1.provider) {
                                    args = access_1.provider.provide();
                                    controller_instance = new (constructor_1.bind.apply(constructor_1, [void 0].concat(args)))();
                                }
                                else {
                                    controller_instance = ServiceBuilder_1.ServiceBuilder.ConstructService(constructor_1);
                                }
                                setter = new Controller_1.ControllerConfig();
                                setter.set_up_controller(controller_instance, req, res, next);
                                //Allow Async for init function
                                return [4 /*yield*/, Promise.resolve(controller_instance.onInit())];
                            case 3:
                                //Allow Async for init function
                                _b.sent();
                                if (!(access_1.middleware && access_1.middleware.route && access_1.middleware.route[key] && access_1.middleware.route[key].length))
                                    return [3 /*break*/, 5];
                                middleware_2 = Stack_1.Stack.apply(this, access_1.middleware.route[key]);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        middleware_2(req, res, function (response) {
                                            if (response instanceof String) {
                                                next(response);
                                            }
                                            else {
                                                resolve(response);
                                            }
                                        });
                                    })];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5:
                                params = [];
                                //Dependency injection
                                params = ServiceBuilder_1.ServiceBuilder.getServiceMethodNeeds(target, key);
                                _b.label = 6;
                            case 6:
                                _b.trys.push([6, 8, , 9]);
                                return [4 /*yield*/, Promise.resolve(((_a = controller_instance)[key].apply(_a, params)))];
                            case 7:
                                _b.sent();
                                return [3 /*break*/, 9];
                            case 8:
                                e_1 = _b.sent();
                                next(e_1);
                                return [3 /*break*/, 9];
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                e_2 = _b.sent();
                                next(e_2);
                                return [3 /*break*/, 11];
                            case 11: return [2 /*return*/];
                        }
                    });
                });
            }
        });
        return d;
    };
}
//# sourceMappingURL=Method.js.map