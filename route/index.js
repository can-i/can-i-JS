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
let setter = new index_1.PublicController();
function Route(route = "/") {
    return function (constructor) {
        let router = index_2.Express.Router();
        if ('methods' in constructor) {
            let keys = Object.keys(constructor.methods);
            for (let key of keys) {
                let routeOption = constructor.methods[key];
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
        }
        index_2.app.use(route, router);
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
function MkActivity(route = '') {
    return ExtendRequest(route, 'mkactivity');
}
exports.MkActivity = MkActivity;
function MkActivity(route = '') {
    return ExtendRequest(route, 'move');
}
exports.MkActivity = MkActivity;
function ExtendRequest(route, type) {
    return function (target, key, d) {
        const original = d.value;
        let constructor = target.constructor;
        constructor.methods = constructor.methods || {};
        let handler = constructor.methods[type] = (constructor.methods[type] || []);
        handler.push({
            route_name: route,
            route_function: function (req, res, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    let controller = new target.constructor();
                    setter.set_up_controller(controller, req, res, next);
                    yield Promise.resolve(controller.onInit());
                    original.apply(controller);
                });
            }
        });
    };
}
//# sourceMappingURL=index.js.map