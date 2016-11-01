
import { Listen, Close,BootStrap,Express} from "../win";
import { BaseController } from './../LikeController/index';

import {Configure} from "../Config"
import { Route, Get, Post } from "../route";
import { Inject, Injectable } from "../IOC";
import { Document } from "../help";
import {MiddleWare,Stack} from "../MiddleWare";
import request = require("superagent");
var must = require("must");

var sinon = require("sinon");

let method_pre = sinon.spy();
let method_post = sinon.spy();



var parser = require("body-parser");
let BaseApi = Stack(function(req:any,res:any,next:Express.NextFunction){
    method_pre()
    next()
},parser.json(),function(req:any,res:any,next:Express.NextFunction){
    method_post()
    next()
});

describe("Can-I", function () {

    before(function () {

        BootStrap(null);

        @Injectable
        class UserService {
            getUser() {
                return {
                    Author: "Shavauhn Gabay"
                }
            }
        }

        @Injectable
        class ItemService{
            getItem(){
                return {
                    name:"GTX Titan PASCAL"
                }
            }
        }


        
        @Document({
            title: "User Controller",
            description: `Contains information about the user`
        })
        @Route("/user")
        class UserController extends BaseController {


            @Get("/greeting")
            public hello() {
                this.send("Hello, World");
            }

            @Inject
            @Get("/info")
            public User(service: UserService) {
                this.send(service.getUser());
            }
        }

        @Route("/item")
        @Document({
            title: "Item Controller",
            description: `Contains information about the Item`
        })
        class ItemController extends BaseController {

            @Get("/detail")
            @Inject
            public detail(service:ItemService) {
                this.send(service.getItem())
            }
        }

        @MiddleWare(BaseApi)
        @Route("/test")
        class CanPost extends BaseController{

            @Post("/test")
            public test(){
                if(Object.keys((<any>this.req).body).length){
                    this.send("success");
                }
            }
        }


        return new Promise((resolve) => {

            Configure({
                features: [
                    'documentation'
                ]
            })


            Listen(3000, function () {
                resolve();
            })
        })

    })


    it("Should be able to get the user greeting", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/user/greeting").end(function (err, res) {
                let {text} = res;
                must(text).equal("Hello, World")
                if (err) {
                    reject(err)
                } else
                    resolve();
            })
        })
    })

    it("It should be able to get the author information", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/user/info").end(function (err, res) {
                let {body} = res;
                must(body.Author).equal("Shavauhn Gabay")
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })

    it("It should be able to get the author information", function () {
       must(method_pre.called).true
    })

    it("It should be able to get the author information", function () {
      must(method_post.called).true
    })

    it("It should be able to get the author information", function () {
        return new Promise((resolve, reject) => {
            request.post("http://localhost:3000/test/test").send({
                "key":"value"
            }).end(function (err, res) {
                let {text} = res;
                must(text).equal("success")
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })

    it("Document", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                let {body} = res;                
                must(body).true

                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })

    after(Close);

})


//The Wolf, The Fire, The Fox, and The Blood Moon