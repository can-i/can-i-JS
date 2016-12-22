"use strict";
var index_1 = require("../Route/index");
var sinon = require("sinon");
var must = require("must");
var chai = require("chai");
var expect = chai.expect;
var should = chai.should();
require("source-map-support/register");
var TestRouterProxy = (function () {
    function TestRouterProxy() {
    }
    TestRouterProxy.prototype.get = function () {
    };
    TestRouterProxy.prototype.post = function () {
    };
    return TestRouterProxy;
}());
var TestRouteProvider = (function () {
    function TestRouteProvider() {
    }
    TestRouteProvider.prototype.provide = function () {
        return new TestRouterProxy();
    };
    return TestRouteProvider;
}());
var TestIAppProvider = (function () {
    function TestIAppProvider() {
    }
    TestIAppProvider.prototype.getApp = function () {
        return new TestIApp();
    };
    return TestIAppProvider;
}());
var TestIApp = (function () {
    function TestIApp() {
    }
    TestIApp.prototype.use = function () {
    };
    return TestIApp;
}());
var FakeStateProvider = (function () {
    function FakeStateProvider() {
    }
    FakeStateProvider.prototype.getState = function () {
        return { Ready: true };
    };
    return FakeStateProvider;
}());
describe("ExpressRouteBinder", function () {
    var binder;
    var routeProvider = new TestRouteProvider();
    var testIApp = new TestIAppProvider();
    var options = [
        {
            route_name: "/test",
            route_function: function () {
            }
        }
    ];
    var internalAccess = {
        methods: {
            get: options
        }
    };
    before(function () {
        binder = new index_1.ExpressRouteBinder("/test", routeProvider, internalAccess, testIApp, new FakeStateProvider);
        sinon.spy(routeProvider, "provide");
        sinon.spy(TestRouterProxy.prototype, "get");
        binder.bind();
    });
    beforeEach(function () {
    });
    afterEach(function () {
        // (<any>routeProvider.provide).restore()
        // (<any>TestRouterProxy.prototype.get).restore()
    });
    it("should ask the provider for the router provider", function () {
        var spy = routeProvider.provide;
        var count = spy.callCount;
        expect(count).to.not.be.eq(0, "Route Provider was never called");
    });
    it("the proxy get method should be called", function () {
        var spy = routeProvider.provide;
        var providerCall = spy.firstCall;
        var proxy = providerCall.returnValue;
        expect(proxy).to.exist;
        var proxyCall = proxy.get;
        expect(proxyCall.callCount).to.eq(1);
        console.log(proxyCall.firstCall.args);
        expect(proxyCall.firstCall.args[0]).to.equal("/test");
    });
});
//# sourceMappingURL=ExpressRouteBinder.test.js.map