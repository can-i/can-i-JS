import 'source-map-support/register';
import { Listen, Close, BootStrap, Express } from "../Win";
import { BaseController } from './../LikeController';
import { Singleton } from "../IOC/Singleton";
import { Route } from "../Route";
import { Configure } from "../Config"
import { Get, Post } from "../Route/Method";
import { Injectable } from "../IOC";
import { Document } from "../Help";
import { MiddleWare, Stack } from "../MiddleWare";
import { Job } from "../Work";
import { Logger } from '../Utility/Log';
import { State } from '../Win';
import Event from '../Event';
import request = require("superagent");
import sinon = require("sinon");
var must = require("must");

let method_pre = sinon.spy();
let method_post = sinon.spy();


let jobspy = sinon.spy();

Logger.Application("start-----------------------------------------------------------")

var parser = require("body-parser");
let BaseApi = Stack(function (req: any, res: any, next: Express.NextFunction) {
    method_pre()
    next()
}, parser.json(), function (req: any, res: any, next: Express.NextFunction) {
    method_post()
    next()
});

describe("Can-I", function () {

    let spy = sinon.spy()
    let cronspy = sinon.spy();
    before(function () {

        BootStrap(null);

        @Singleton
        class Database {
            constructor() {
                spy()
            }

            getUser() {
                return {
                    Author: "Shavauhn Gabay"
                }
            }

            getItem() {
                return {
                    name: "GTX Titan PASCAL"
                }
            }
        }

        @Injectable
        class UserService {

            constructor(public db: Database) {

            }

            getUser() {
                return this.db.getUser();
            }
        }

        @Injectable
        class ItemService {
            getItem() {

            }
        }

        @Document({
            title: "User Controller",
            description: `Contains information about the user`
        })
        @Route("/user")
        class UserController extends BaseController {

            constructor(public service: UserService) {
                super();
            }

            @Get("/greeting")
            public hello() {
                this.send("Hello, World");
            }

            @Get("/info")
            public User() {
                this.send(this.service.getUser());
            }
        }

        @Route("/item")
        @Document({
            title: "Item Controller",
            description: `Contains information about the Item`
        })
        class ItemController extends BaseController {

            constructor(public service: ItemService) {
                super();
            }


            @Get("/detail")
            public detail() {
                this.send(this.service.getItem())
            }
        }

        @MiddleWare(BaseApi)
        @Route("/test")
        class CanPost extends BaseController {

            @Post("/test")
            public test() {
                if (Object.keys((<any>this.req).body).length) {
                    this.send("success");
                }
            }


            @Job({
                ever: 1000
            })
            post(next: any) {
                console.log("spy")
                jobspy();
                next();
            }

            @Job({
                cron: "* * * * * *"
            })
            CronTask(next: Function) {
                console.log("cron spy");
                cronspy();
                next();
            }
        }


        return new Promise((resolve) => {
            let keep_going = function () {
                Configure({
                    features: [
                        'documentation'
                    ]
                })


                Listen(3000, function () {
                    resolve();
                })
            }

            keep_going()

            // if (State.Ready) {
            //     keep_going();
            // }else{
            //     Event.on("can-i:bootstrapped",keep_going)
            // }

        })

    })

    it("Testing if Controller Jobs work with spy", function (next) {
        this.timeout(5000);
        setTimeout(function () {
            must(jobspy.callCount).equal(2);
            next();
        }, 2000 + 100);
    })

    it("Testing if Controller Jobs work with cron spy", function (next) {
        this.timeout(20000);
        setTimeout(function () {
            try {
                must(cronspy.callCount).equal(2);
                next();
            } catch (e) {
                next(e);
            }
        }, 10);
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
                "key": "value"
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

    afterEach(function () {
        must(spy.calledOnce).true;
    })

    after(Close);

})


//The Wolf, The Fire, The Fox, and The Blood Moon