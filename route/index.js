"use strict";
var index_1 = require("./../win/index");
var index_2 = require("./../LikeController/index");
function Route(route) {
    if (route === void 0) { route = "/"; }
    return function RouteAttacher(constructor) {
        var router = index_1.Express.Router();
        var access = index_1.Accessor(constructor);
        var keys = Object.keys(access.methods || {});
        access.route_prefix = route;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var routeOption = access.methods[key];
            for (var _a = 0, routeOption_1 = routeOption; _a < routeOption_1.length; _a++) {
                var o = routeOption_1[_a];
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
var setter = new index_2.ControllerConfig();
//# sourceMappingURL=index.js.map