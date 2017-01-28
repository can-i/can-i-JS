import * as sinon from "sinon";
import * as chai from "chai";
import { Controller } from '../lib/Controller/Controller';
import { ControllerFactory } from '../lib/Controller/ControllerFactory';
import * as express from 'express';
import CanIWin from '../index';

const expect = chai.expect;



describe("Test",function(){

    class FakeController extends CanIWin.Controllers.Controller{

    }

    let instance:Controller;

    before(async function(){
        instance = ControllerFactory.CreateBaseController(
            FakeController,
            {} as express.Request, 
            {} as express.Response,
            ()=>{}
        );
    })


    it("should create an instance of the Controller Class", function(){
        expect(instance).to.be.an.instanceOf(CanIWin.Controllers.Controller);
    })
})