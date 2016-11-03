"use strict";
function View(target, key, d) {
    let original = d.value;
    d.value = function (...args) {
        this.internal_options.render = true;
        original.apply(this, args);
    };
    return d;
}
exports.View = View;
//# sourceMappingURL=View.js.map