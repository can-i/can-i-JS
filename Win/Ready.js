"use strict";
var Constant_1 = require("./Constant");
var READY_KEY = "__GLOBAL_READY_KEY";
var Ready = (function () {
    function Ready() {
        this.store = [];
        console.log("created Ready");
    }
    Ready.prototype.isReady = function () {
        return Constant_1.Constant.set(READY_KEY, { ready: false }).ready;
    };
    Ready.prototype.Ready = function () {
        var readyState = Constant_1.Constant.set(READY_KEY, { ready: true });
        readyState.ready = true;
        var cb;
        while (cb = this.store.shift()) {
            cb();
        }
    };
    Ready.prototype.OnReady = function (cb) {
        if (this.isReady()) {
            cb();
        }
        else {
            this.store.push(cb);
        }
    };
    return Ready;
}());
exports.Ready = Ready;
//# sourceMappingURL=Ready.js.map