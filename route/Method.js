"use strict";

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Accessor_1 = require('./../win/Accessor');
var index_1 = require('./../Controller/index');
var ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
var Stack_1 = require("../MiddleWare/Stack");
function Get() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'get');
}
exports.Get = Get;
function Post() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'post');
}
exports.Post = Post;
function Put() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'put');
}
exports.Put = Put;
function Use() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'use');
}
exports.Use = Use;
function Checkout() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'checkout');
}
exports.Checkout = Checkout;
function Copy() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'copy');
}
exports.Copy = Copy;
function Delete() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'delete');
}
exports.Delete = Delete;
function Head() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'head');
}
exports.Head = Head;
function Lock() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'lock');
}
exports.Lock = Lock;
function Merge() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'merge');
}
exports.Merge = Merge;
function MkActivity() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'mkactivity');
}
exports.MkActivity = MkActivity;
function MkCol() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'mkcol');
}
exports.MkCol = MkCol;
function Move() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'move');
}
exports.Move = Move;
function MSearch() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'm-search');
}
exports.MSearch = MSearch;
function Notify() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'notify');
}
exports.Notify = Notify;
function Options() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'options');
}
exports.Options = Options;
function Patch() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'patch');
}
exports.Patch = Patch;
function Report() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'report');
}
exports.Report = Report;
function Search() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'search');
}
exports.Search = Search;
function Subscribe() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'subscribe');
}
exports.Subscribe = Subscribe;
function Trace() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'trace');
}
exports.Trace = Trace;
function Unlock() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'unlock');
}
exports.Unlock = Unlock;
function unsubscribe() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return ExtendRequest(route, 'unsubscribe');
}
exports.unsubscribe = unsubscribe;
function ExtendRequest(route, type) {
    return function (target, key, d) {
        var constructor = target.constructor;
        var access = Accessor_1.Accessor(constructor);
        access.methods = access.methods || {};
        var handler = access.methods[type] = access.methods[type] || [];
        handler.push({
            route_name: route,
            route_function: function route_function(req, res, next) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                    var _this = this;

                    var _constructor, _access, controller_instance, setter, params;

                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.prev = 0;
                                    _constructor = target.constructor;
                                    _access = Accessor_1.Accessor(_constructor);

                                    if (!(_access.middleware && _access.middleware.global && _access.middleware.global.length)) {
                                        _context3.next = 5;
                                        break;
                                    }

                                    return _context3.delegateYield(_regenerator2.default.mark(function _callee() {
                                        var middleware;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        middleware = Stack_1.Stack.apply(_this, _access.middleware.global);
                                                        _context.next = 3;
                                                        return new _promise2.default(function (reject, resolve) {
                                                            middleware(req, res, function (response) {
                                                                if (response instanceof String) {
                                                                    next(response);
                                                                } else {
                                                                    reject(response);
                                                                }
                                                            });
                                                        });

                                                    case 3:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this);
                                    })(), 't0', 5);

                                case 5:
                                    controller_instance = ServiceBuilder_1.ServiceBuilder.ConstructService(_constructor);
                                    setter = new index_1.ControllerConfig();

                                    setter.set_up_controller(controller_instance, req, res, next);
                                    controller_instance.onInit();

                                    if (!(_access.middleware && _access.middleware.route && _access.middleware.route[key] && _access.middleware.route[key].length)) {
                                        _context3.next = 11;
                                        break;
                                    }

                                    return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
                                        var middleware;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        middleware = Stack_1.Stack.apply(_this, _access.middleware.route[key]);
                                                        _context2.next = 3;
                                                        return new _promise2.default(function (reject, resolve) {
                                                            middleware(req, res, function (response) {
                                                                if (response instanceof String) {
                                                                    next(response);
                                                                } else {
                                                                    reject(response);
                                                                }
                                                            });
                                                        });

                                                    case 3:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    })(), 't1', 11);

                                case 11:
                                    params = [];

                                    params = ServiceBuilder_1.ServiceBuilder.getServiceMethodNeeds(target, key);
                                    _context3.prev = 13;
                                    _context3.next = 16;
                                    return _promise2.default.resolve(controller_instance[key].apply(controller_instance, (0, _toConsumableArray3.default)(params)));

                                case 16:
                                    _context3.next = 21;
                                    break;

                                case 18:
                                    _context3.prev = 18;
                                    _context3.t2 = _context3['catch'](13);

                                    next(_context3.t2);

                                case 21:
                                    _context3.next = 26;
                                    break;

                                case 23:
                                    _context3.prev = 23;
                                    _context3.t3 = _context3['catch'](0);

                                    next(_context3.t3);

                                case 26:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this, [[0, 23], [13, 18]]);
                }));
            }
        });
        return d;
    };
}
//# sourceMappingURL=Method.js.map