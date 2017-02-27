"use strict";
var tslib_1 = require("tslib");
var ApplicationController_1 = require("./ApplicationController");
var CommunicationController = (function (_super) {
    tslib_1.__extends(CommunicationController, _super);
    function CommunicationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CommunicationController.prototype, "req", {
        /**
         * Express req Object
         */
        get: function () {
            return this._req;
        },
        /**
         * Express req Object
         */
        set: function (v) {
            if (!this._req) {
                this._req = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommunicationController.prototype, "res", {
        /**
         * The express res Object
         */
        get: function () {
            return this._res;
        },
        /**
         * Express res Object
         */
        set: function (v) {
            if (!this._res) {
                this._res = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommunicationController.prototype, "next", {
        /**
         * The express Next function used to go to the next middleware.
         */
        get: function () {
            return this._next;
        },
        set: function (v) {
            if (!this._next) {
                this._next = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    CommunicationController.prototype.send = function (body) {
        this.res.send(body);
        return this;
    };
    /**
     * Set the Status of the response
     */
    CommunicationController.prototype.status = function (code) {
        this.res.status(code);
        return this;
    };
    return CommunicationController;
}(ApplicationController_1.ApplicationController));
exports.CommunicationController = CommunicationController;
//# sourceMappingURL=CommunicationController.js.map