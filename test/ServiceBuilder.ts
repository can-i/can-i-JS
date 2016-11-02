import { ServiceBuilder } from './../IOC/ServiceBuilder';

import {Singleton,Injectable} from "../IOC";
import sinon = require("sinon");
let must = require("must");


describe("ServiceBuilder",function(){

    let method = sinon.spy();
    let method2= sinon.spy()

    @Singleton
    class One{
        constructor(){
            method();
        }
    }

    @Injectable
    class Two{
        constructor(public one:One){
            method2()
        }
    }

    beforeEach(function(){
        ServiceBuilder.BuildService(Two);
    })

    it("spy two should be called once",function(){
        must(method.calledOnce).true
        must(method2.calledOnce).true
    })


    it("spy one should be called twice",function(){
        must(method.calledOnce).true
        must(method2.callCount).equal(2);
    })



})