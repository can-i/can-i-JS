"use strict";
var rootname = "com.can-i-js.www";
var RootContext = (function () {
    function RootContext() {
        this.ControllerOptions = [];
    }
    return RootContext;
}());
exports.RootContext = RootContext;
function Root() {
    return global[rootname] || (global[rootname] = new RootContext());
}
exports.Root = Root;
//# sourceMappingURL=Internal.js.map