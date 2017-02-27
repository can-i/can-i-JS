"use strict";
var ControllerFactory = (function () {
    function ControllerFactory() {
    }
    ControllerFactory.CreateBaseController = function (ControllerClass, req, res, next) {
        var c = new ControllerClass();
        c.req = req;
        c.res = res;
        c.next = next;
        return c;
    };
    return ControllerFactory;
}());
exports.ControllerFactory = ControllerFactory;
//# sourceMappingURL=ControllerFactory.js.map