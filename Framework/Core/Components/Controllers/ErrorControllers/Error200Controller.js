"use strict";
var tslib_1 = require("tslib");
var Controller_1 = require("../Controller");
var Error200Controller = (function (_super) {
    tslib_1.__extends(Error200Controller, _super);
    function Error200Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error200Controller.prototype.OK = function (body) {
        this.status(200).send(body);
    };
    Error200Controller.prototype.Created = function (body) {
        this.status(201).send(body);
    };
    Error200Controller.prototype.Accepted = function (body) {
        this.status(202).send(body);
    };
    Error200Controller.prototype.NonAuthoritativeInformation = function (body) {
        this.status(203).send(body);
    };
    Error200Controller.prototype.NoContent = function (body) {
        this.status(204).send(body);
    };
    Error200Controller.prototype.ResetContent = function (body) {
        this.status(205).send(body);
    };
    Error200Controller.prototype.PartialContent = function (body) {
        this.status(206).send(body);
    };
    Error200Controller.prototype.MultiStatus = function (body) {
        this.status(207).send(body);
    };
    Error200Controller.prototype.AlreadyReported = function (body) {
        this.status(208).send(body);
    };
    Error200Controller.prototype.IMUsed = function (body) {
        this.status(226).send(body);
    };
    return Error200Controller;
}(Controller_1.CommunicationController));
exports.Error200Controller = Error200Controller;
//# sourceMappingURL=Error200Controller.js.map