import { BootStrap, Listen, OnReady, Close } from '../Win/index';
import * as sinon from 'sinon';
import * as chai from "chai";
const expect = chai.expect;



describe("OnReady",function(){

    let spy = sinon.spy();
    before(function(done){
        BootStrap();
        OnReady(spy);
        Listen(3000,done);
    })


    after(function(){
        Close();
    })

    it("should call the spy once",function(){
        expect(spy.calledOnce).to.be.true;
    })
})