"use strict";
function View(page) {
    return function View(target, key, d) {
        let original = d.value;
        d.value = function (data) {
            data = data || {};
            this.internal_options.render = true;
            original.apply(this, page, data);
        };
        return d;
    };
}
exports.View = View;
//# sourceMappingURL=View.js.map