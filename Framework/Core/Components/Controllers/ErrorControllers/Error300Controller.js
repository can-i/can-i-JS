"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("../Controller");
var Error300Controller = (function (_super) {
    tslib_1.__extends(Error300Controller, _super);
    function Error300Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error300Controller.prototype.MultipleChoices = function (body) {
        this.status(300).send(body);
    };
    Error300Controller.prototype.MovedPermanently = function (body) {
        this.status(301).send(body);
    };
    Error300Controller.prototype.Found = function (body) {
        this.status(302).send(body);
    };
    Error300Controller.prototype.SeeOther = function (body) {
        this.status(303).send(body);
    };
    Error300Controller.prototype.NotModified = function (body) {
        this.status(304).send(body);
    };
    Error300Controller.prototype.UseProxy = function (body) {
        this.status(305).send(body);
    };
    Error300Controller.prototype.TemporaryRedirect = function (body) {
        this.status(307).send(body);
    };
    Error300Controller.prototype.PermanentRedirect = function (body) {
        this.status(308).send(body);
    };
    return Error300Controller;
}(Controller_1.CommunicationController));
exports.Error300Controller = Error300Controller;
//# sourceMappingURL=Error300Controller.js.map