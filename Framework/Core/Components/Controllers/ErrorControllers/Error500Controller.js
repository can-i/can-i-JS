"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("../Controller");
var Error500Controller = (function (_super) {
    tslib_1.__extends(Error500Controller, _super);
    function Error500Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error500Controller.prototype.InternalServerError = function (body) {
        this.status(500).send(body);
    };
    Error500Controller.prototype.NotImplemented = function (body) {
        this.status(501).send(body);
    };
    Error500Controller.prototype.BadGateway = function (body) {
        this.status(502).send(body);
    };
    Error500Controller.prototype.ServiceUnavailable = function (body) {
        this.status(503).send(body);
    };
    Error500Controller.prototype.GatewayTimeout = function (body) {
        this.status(504).send(body);
    };
    Error500Controller.prototype.HTTPVersionNotSupported = function (body) {
        this.status(505).send(body);
    };
    Error500Controller.prototype.VariantAlsoNegotiates = function (body) {
        this.status(506).send(body);
    };
    Error500Controller.prototype.InsufficientStorage = function (body) {
        this.status(507).send(body);
    };
    Error500Controller.prototype.LoopDetected = function (body) {
        this.status(508).send(body);
    };
    Error500Controller.prototype.BandwidthLimitExceeded = function (body) {
        this.status(509).send(body);
    };
    Error500Controller.prototype.NotExtended = function (body) {
        this.status(510).send(body);
    };
    Error500Controller.prototype.NetworkAuthenticationRequired = function (body) {
        this.status(511).send(body);
    };
    Error500Controller.prototype.NetworkReadTimeoutError = function (body) {
        this.status(598).send(body);
    };
    Error500Controller.prototype.NetworkConnectTimeoutError = function (body) {
        this.status(599).send(body);
    };
    return Error500Controller;
}(Controller_1.CommunicationController));
exports.Error500Controller = Error500Controller;
//# sourceMappingURL=Error500Controller.js.map