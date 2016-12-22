import { IRouteBinder, ExpressRouteBinder, IRouterProvider, RouterProvider, IRouterProxy, IAppProvider, IApp, IStateProvider } from '../Route/index';
import * as sinon from "sinon";
const must = require("must");

import * as chai from "chai";
const expect = chai.expect;


const should = chai.should();

import "source-map-support/register";
import { RouteOption } from '../Route/RouteOption';
import { InternalAccessorStructure } from '../IOC/InternalAccessorStructure';
class TestRouterProxy implements IRouterProxy {
    get() {

    }

    post() {

    }
}
class TestRouteProvider implements IRouterProvider {
    provide() {
        return new TestRouterProxy()
    }
}

class TestIAppProvider implements IAppProvider {
    getApp() {
        return new TestIApp();
    }
}


class TestIApp implements IApp {
    use() {

    }
}


class FakeStateProvider implements IStateProvider {
    getState() {
        return { Ready: true }
    }
}



describe("ExpressRouteBinder", function () {
    let binder: IRouteBinder;
    let routeProvider: IRouterProvider = new TestRouteProvider();
    let testIApp = new TestIAppProvider()

    let options: RouteOption[] = [
        {
            route_name: "/test",
            route_function: function () {

            }
        }
    ]

    let internalAccess: Partial<InternalAccessorStructure> = {
        methods: {
            get: options
        }
    }





    before(function () {
        binder = new ExpressRouteBinder("/test", routeProvider, internalAccess, testIApp, new FakeStateProvider);
        sinon.spy(routeProvider, "provide");
        sinon.spy(TestRouterProxy.prototype, "get");
        binder.bind();
    })

    beforeEach(function () {

    })

    afterEach(function () {
        // (<any>routeProvider.provide).restore()
        // (<any>TestRouterProxy.prototype.get).restore()
    })


    it("should ask the provider for the router provider", function () {
        let spy = <sinon.SinonSpy>routeProvider.provide;
        let count = spy.callCount;

        expect(count).to.not.be.eq(0, "Route Provider was never called");
    })


    it("the proxy get method should be called",function(){
        let spy = <sinon.SinonSpy>routeProvider.provide;
        let providerCall = spy.firstCall;
        let proxy = <TestRouterProxy>providerCall.returnValue;

        expect(proxy).to.exist;
        let proxyCall = <sinon.SinonSpy><any>proxy.get;

        expect(proxyCall.callCount).to.eq(1);
        console.log(proxyCall.firstCall.args)

        expect(proxyCall.firstCall.args[0]).to.equal("/test")

    })
})