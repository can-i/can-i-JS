"use strict";
var AppGetter_1 = require("../App/AppGetter");
/**
 * Provides access to the express application
 */
var ApplicationController = (function () {
    function ApplicationController() {
    }
    Object.defineProperty(ApplicationController.prototype, "App", {
        get: function () {
            return AppGetter_1.default();
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationController;
}());
exports.ApplicationController = ApplicationController;
//# sourceMappingURL=ApplicationController.js.map