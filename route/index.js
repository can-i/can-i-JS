"use strict";
const index_1 = require('./../win/index');
const index_2 = require('./../LikeController/index');
function Route(route = "/") {
    return function RouteAttacher(constructor) {
        let router = index_1.Express.Router();
        let access = index_1.Accessor(constructor);
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
let setter = new index_2.ControllerConfig();
//# sourceMappingURL=index.js.map