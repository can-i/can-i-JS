"use strict";
function Stack(...middleware) {
    return function (req, res, next) {
        let i = middleware.length;
        let j = 0;
        function again() {
            if (i > 1) {
                middleware[j](req, res, again);
            }
            else if (i === 1) {
                middleware[j](req, res, next);
            }
            j++;
            i--;
        }
        again();
    };
}
exports.Stack = Stack;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stack;
//# sourceMappingURL=Stack.js.map