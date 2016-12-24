"use strict";
require("source-map-support/register");
var chai = require("chai");
var sinon = require("sinon");
var Application_1 = require("../Win/Application");
var expect = chai.expect;
describe("ExpressFeatureLoader", function () {
    var featureLoader;
    var TestServer = (function () {
        function TestServer() {
            this.features = {};
        }
        TestServer.prototype.enable = function (feature) {
            this.features[feature] = true;
        };
        TestServer.prototype.disable = function (feature) {
            this.features[feature] = false;
        };
        TestServer.prototype.enabled = function (feature) {
            return !!this.features[feature];
        };
        TestServer.prototype.disabled = function (feature) {
            return !!this.features[feature];
        };
        TestServer.prototype.close = function () {
        };
        TestServer.prototype.Listen = function (port, callback) {
            callback();
        };
        return TestServer;
    }());
    var TestServerProvider = (function () {
        function TestServerProvider() {
        }
        TestServerProvider.prototype.provide = function () {
            return TestServerProvider._app || (TestServerProvider._app = new TestServer());
        };
        return TestServerProvider;
    }());
    before(function () {
        featureLoader = new Application_1.ExpressFeatureLoader(new TestServerProvider());
        var proto = TestServer.prototype;
        sinon.spy(proto, "enable");
        sinon.spy(proto, "disable");
        sinon.spy(proto, "enabled");
        sinon.spy(proto, "disabled");
    });
    it("should be able to enable features", function () {
        featureLoader.enable("test");
        var enableSpy = TestServer.prototype.enable;
        expect(enableSpy.calledOnce, "Enable was not called once").to.be.true;
        expect(enableSpy.firstCall.args).to.eqls(["can-i/feature test"]);
        expect(featureLoader.enabled("test"), "Could not verify that the feature was enabled").to.be.true;
    });
    it("should be able to disable features", function () {
        featureLoader.disable("test");
        var disableSpy = TestServer.prototype.disable;
        expect(disableSpy.calledOnce, "Enable was not called once").to.be.true;
        expect(disableSpy.firstCall.args).to.eqls(["can-i/feature test"]);
        expect(featureLoader.enabled("test"), "Could not verify that the feature was enabled").to.be.false;
    });
});
//# sourceMappingURL=featureloader.test.js.map