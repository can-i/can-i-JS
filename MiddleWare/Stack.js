"use strict";
function Stack(...middleware) {
    return function (req, res, next) {
        let i = -1, len = middleware.length;
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