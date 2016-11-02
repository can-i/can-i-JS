import { ServiceBuilder } from './../IOC/ServiceBuilder';

import {Singleton,Injectable} from "../IOC";
import sinon = require("sinon");
let must = require("must");


describe("ServiceBuilder",function(){

    let method = sinon.spy();
    let method2= sinon.spy()

    @Injectable
    class One{
        constructor(){
            method();
        }
    }

    @Singleton
    class Two{
        constructor(public one:One){
            method2()
        }
    }

    beforeEach(function(){
        ServiceBuilder.BuildService(Two);
    })

    it("spy one should be called twice",function(){
        must(method.callCount).equal(2);
    })

    it("spy two should be called once",function(){
        must(method.calledOnce).true
    })


})