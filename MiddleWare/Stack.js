"use strict";
function Stack() {
    var middleware = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middleware[_i - 0] = arguments[_i];
    }
    return function (req, res, next) {
        var i = -1, len = middleware.length;
        function again() {
            i++;
            if (i < len - 1) {
                middleware[i](req, res, again);
            }
            else if (i === len - 1) {
                middleware[i](req, res, next);
            }
        }
        again();
    };
}
exports.Stack = Stack;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stack;
//# sourceMappingURL=Stack.js.map