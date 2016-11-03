"use strict";
const index_1 = require('./../win/index');
const Accessor_1 = require('./../win/Accessor');
const Express = require("express");
function Route(route = "/") {
    return function RouteAttacher(constructor) {
        let router = Express.Router();
        let access = Accessor_1.Accessor(constructor);
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
        index_1.App().use(route, router);
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map