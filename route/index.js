"use strict";
var Win_1 = require("./../Win");
var LikeController_1 = require("./../LikeController");
var Event_1 = require("../Event");
///////////
function Route(route) {
    if (route === void 0) { route = "/"; }
    return function RouteAttacher(constructor) {
        var router = Win_1.Express.Router();
        var access = Win_1.Accessor(constructor);
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
        if (Win_1.State.Ready) {
            Win_1.App().use(route, router);
        }
        else {
            Event_1.default.on("can-i:bootstrapped", function () {
                Win_1.App().use(route, router);
            });
        }
    };
}
exports.Route = Route;
var setter = new LikeController_1.ControllerConfig();
//# sourceMappingURL=index.js.map