"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("../Controller");
/**
 * All of these might not get implemented but it's good to have them
 */
var Error400Controller = (function (_super) {
    tslib_1.__extends(Error400Controller, _super);
    function Error400Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error400Controller.prototype.BadRequest = function (body) {
        this.status(400).send(body);
    };
    Error400Controller.prototype.Unauthorized = function (body) {
        this.status(401).send(body);
    };
    Error400Controller.prototype.PaymentRequired = function (body) {
        this.status(402).send(body);
    };
    Error400Controller.prototype.Forbidden = function (body) {
        this.status(403).send(body);
    };
    Error400Controller.prototype.NotFound = function (body) {
        this.status(404).send(body);
    };
    Error400Controller.prototype.MethodNotAllowed = function (body) {
        this.status(405).send(body);
    };
    Error400Controller.prototype.NotAcceptable = function (body) {
        this.status(406).send(body);
    };
    Error400Controller.prototype.ProxyAuthenticationRequired = function (body) {
        this.status(407).send(body);
    };
    Error400Controller.prototype.RequestTimeout = function (body) {
        this.status(408).send(body);
    };
    Error400Controller.prototype.Conflict = function (body) {
        this.status(409).send(body);
    };
    Error400Controller.prototype.Gone = function (body) {
        this.status(410).send(body);
    };
    Error400Controller.prototype.LengthRequired = function (body) {
        this.status(411).send(body);
    };
    Error400Controller.prototype.PreconditionFailed = function (body) {
        this.status(412).send(body);
    };
    Error400Controller.prototype.RequestEntityTooLarge = function (body) {
        this.status(413).send(body);
    };
    Error400Controller.prototype.RequestURITooLong = function (body) {
        this.status(414).send(body);
    };
    Error400Controller.prototype.UnsupportedMediaType = function (body) {
        this.status(415).send(body);
    };
    Error400Controller.prototype.RequestedRangeNotSatisfiable = function (body) {
        this.status(416).send(body);
    };
    Error400Controller.prototype.ExpectationFailed = function (body) {
        this.status(417).send(body);
    };
    Error400Controller.prototype.EnhanceYourCalm = function (body) {
        this.status(420).send(body);
    };
    Error400Controller.prototype.UnprocessableEntity = function (body) {
        this.status(422).send(body);
    };
    Error400Controller.prototype.Locked = function (body) {
        this.status(423).send(body);
    };
    Error400Controller.prototype.FailedDependency = function (body) {
        this.status(424).send(body);
    };
    Error400Controller.prototype.UpgradeRequired = function (body) {
        this.status(426).send(body);
    };
    Error400Controller.prototype.PreconditionRequired = function (body) {
        this.status(428).send(body);
    };
    Error400Controller.prototype.TooManyRequests = function (body) {
        this.status(429).send(body);
    };
    Error400Controller.prototype.RequestHeaderFieldsTooLarge = function (body) {
        this.status(431).send(body);
    };
    Error400Controller.prototype.NoResponse = function (body) {
        this.status(444).send(body);
    };
    Error400Controller.prototype.RetryWith = function (body) {
        this.status(449).send(body);
    };
    Error400Controller.prototype.BlockedbyWindowsParentalControls = function (body) {
        this.status(450).send(body);
    };
    Error400Controller.prototype.UnavailableForLegalReasons = function (body) {
        this.status(451).send(body);
    };
    Error400Controller.prototype.ClientClosedRequest = function (body) {
        this.status(499).send(body);
    };
    return Error400Controller;
}(Controller_1.CommunicationController));
exports.Error400Controller = Error400Controller;
//# sourceMappingURL=Error400Controller.js.map