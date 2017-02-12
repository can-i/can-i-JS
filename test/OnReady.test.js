"use strict";
require("source-map-support/register");
var index_1 = require("../Win/index");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
describe("OnReady", function () {
    var spy = sinon.spy();
    before(function (done) {
        index_1.BootStrap();
        debugger;
        index_1.Listen(5000, function () {
            done();
        });
        index_1.OnReady(spy);
        index_1.OnReady(spy);
    });
    after(function () {
        index_1.Close();
    });
    it("should be able to resolve after first resolve", function (done) {
        index_1.OnReady(function () {
            spy();
            done();
        });
    });
    it("should call the spy 3 times", function () {
        expect(spy.calledThrice).to.be.true;
    });
});
//# sourceMappingURL=OnReady.test.js.map