"use strict";
var index_1 = require("../Win/index");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
describe("OnReady", function () {
    var spy = sinon.spy();
    before(function (done) {
        index_1.BootStrap();
        index_1.OnReady(spy);
        index_1.Listen(3000, done);
    });
    after(function () {
        index_1.Close();
    });
    it("should call the spy once", function () {
        expect(spy.calledOnce).to.be.true;
    });
});
//# sourceMappingURL=OnReady.test.js.map