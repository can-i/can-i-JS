"use strict";
function RouteFormatter(route_path) {
    route_path = ("/" + route_path).replace(/\/+/, "/").replace(/\/+$/, "");
    return route_path ? route_path : "/";
}
exports.RouteFormatter = RouteFormatter;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteFormatter;
//# sourceMappingURL=RouteFormatter.js.map