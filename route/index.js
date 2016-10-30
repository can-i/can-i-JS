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
        console.log("route");
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
    return function (target, key, d) {
        const original = d.value;
        let constructor = target.constructor;
        constructor.methods = constructor.methods || {};
        constructor.methods.get = constructor.methods.get || [];
        constructor.methods.get.push({
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
exports.Get = Get;
function Post(route = '') {
    return function (target, key, d) {
        const original = d.value;
        let constructor = target.constructor;
        constructor.methods = constructor.methods || {};
        constructor.methods.post = constructor.methods.post || [];
        constructor.methods.post.push({
            routename: route,
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
exports.Post = Post;
//# sourceMappingURL=index.js.map