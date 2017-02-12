"use strict";
function View(page) {
    return function View(target, key, d) {
        var original = d.value;
        d.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.internal_options.render = true;
            this.internal_options.renderPage = page;
            original.apply(this, args);
        };
        return d;
    };
}
exports.View = View;
//# sourceMappingURL=View.js.map