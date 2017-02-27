"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("./Controller");
var app_1 = require("../App/app");
/**
 * Class:BaseController
 *
 * Description:
 *
 * This class gives access to some of the common,
 * properties you could expect can be found here.
 *
 * This includes
 * field:body
 * field:session
 *
 * There maybe more things to look for.
 * Some of these can be found in classes that extends this class.
 *
 * These clesses should for the betterment of every class that
 * extend this class list thier properties.
 *
 *
 * field:body
 * description: This is the body property that is normally found on the
 * req.body property. This was placed here so that it could be easy to access
 * This way of accessing will field alien at first.
 * But this project believes that quick access to commonly seeked properties
 * can be reached.
 *
 * field:session
 * description: This is the session project that is normally found on the
 * req.session. This is believes to be plesant to be accessed.
 *
 *
 * field:app
 * description: This is quick access to the app property that is normally found
 * when you start an express js application
 *
 * let app = express();
 *
 * This is the same app property that is available on this class
 *
 *
 * This is the original version that was intented for the user to extend.
 *
 *
 *
 *
 * Start here.
 */
var BaseController = (function (_super) {
    tslib_1.__extends(BaseController, _super);
    function BaseController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseController.prototype, "body", {
        /**
         * This is the body object that is normally configured from a middleware.
         * This does not come standard and must be added with a middleware.
         *
         * At the time of this writing this is normally don't with a module called body-parser.
         * This is the standard module that is normally used.
         */
        get: function () {
            return this.req.body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "session", {
        /**
         * This is the req.session that you are use to using
         * in express application. This is normally created using
         * a middleware
         *
         * This will have to be configured and is not loaded by default.
         * This is because there is alot of different middlewares out there.
         *
         * This way the middleware being used can still be customized.
         *
         * This will bring flexibility of the application.
         * The session variable might be unavailable if the application is not configured.
         *
         * A Class that is a subclass of this might enabled the Session by default.
         *
         * This class however does not provide this.
         */
        get: function () {
            return this.req.session;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "app", {
        /**
         * This is the express application you are used to using.
         */
        get: function () {
            this._app = this._app || app_1.default();
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    return BaseController;
}(Controller_1.Controller));
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map