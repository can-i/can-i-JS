"use strict";

function Stack() {
    for (var _len = arguments.length, middleware = Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
    }

    return function (req, res, next) {
        var i = -1,
            len = middleware.length;
        function again() {
            i++;
            if (i < len - 1) {
                middleware[i](req, res, again);
            } else if (i === len - 1) {
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