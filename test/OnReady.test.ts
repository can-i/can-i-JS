import "source-map-support/register";
import { BootStrap, Listen, OnReady, Close } from '../Win/index';
import * as sinon from 'sinon';
import * as chai from "chai";
const expect = chai.expect;



describe("OnReady", function () {

    let spy = sinon.spy();
    before(function (done) {
        BootStrap();
        debugger;
        Listen(5000, function () {
            done()
        });

        OnReady(spy);
        OnReady(spy);
    })


    after(function () {
        Close();
    })

    it("should be able to resolve after first resolve", function (done) {
        OnReady(function () {
            spy();
            done();
        })
    })

    it("should call the spy 3 times", function () {
        expect(spy.calledThrice).to.be.true;
    })
})