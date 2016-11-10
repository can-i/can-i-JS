"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('source-map-support/register');
const win_1 = require("../win");
const index_1 = require('./../LikeController/index');
const Singleton_1 = require("../IOC/Singleton");
const route_1 = require("../route");
const Config_1 = require("../Config");
const Method_1 = require("../route/Method");
const IOC_1 = require("../IOC");
const help_1 = require("../help");
const MiddleWare_1 = require("../MiddleWare");
const request = require("superagent");
const sinon = require("sinon");
var must = require("must");
let method_pre = sinon.spy();
let method_post = sinon.spy();
var parser = require("body-parser");
let BaseApi = MiddleWare_1.Stack(function (req, res, next) {
    method_pre();
    next();
}, parser.json(), function (req, res, next) {
    method_post();
    next();
});
describe("Can-I", function () {
    let spy = sinon.spy();
    before(function () {
        win_1.BootStrap(null);
        let Database = class Database {
            constructor() {
                spy();
            }
            getUser() {
                return {
                    Author: "Shavauhn Gabay"
                };
            }
            getItem() {
                return {
                    name: "GTX Titan PASCAL"
                };
            }
        };
        Database = __decorate([
            Singleton_1.Singleton, 
            __metadata('design:paramtypes', [])
        ], Database);
        let UserService = class UserService {
            constructor(db) {
                this.db = db;
            }
            getUser() {
                return this.db.getUser();
            }
        };
        UserService = __decorate([
            IOC_1.Injectable, 
            __metadata('design:paramtypes', [Database])
        ], UserService);
        let ItemService = class ItemService {
            getItem() {
            }
        };
        ItemService = __decorate([
            IOC_1.Injectable, 
            __metadata('design:paramtypes', [])
        ], ItemService);
        let UserController = class UserController extends index_1.BaseController {
            constructor(service) {
                super();
                this.service = service;
            }
            hello() {
                this.send("Hello, World");
            }
            User() {
                this.send(this.service.getUser());
            }
        };
        __decorate([
            Method_1.Get("/greeting"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], UserController.prototype, "hello", null);
        __decorate([
            Method_1.Get("/info"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], UserController.prototype, "User", null);
        UserController = __decorate([
            help_1.Document({
                title: "User Controller",
                description: `Contains information about the user`
            }),
            route_1.Route("/user"), 
            __metadata('design:paramtypes', [UserService])
        ], UserController);
        let ItemController = class ItemController extends index_1.BaseController {
            constructor(service) {
                super();
                this.service = service;
            }
            detail() {
                this.send(this.service.getItem());
            }
        };
        __decorate([
            Method_1.Get("/detail"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], ItemController.prototype, "detail", null);
        ItemController = __decorate([
            route_1.Route("/item"),
            help_1.Document({
                title: "Item Controller",
                description: `Contains information about the Item`
            }), 
            __metadata('design:paramtypes', [ItemService])
        ], ItemController);
        let CanPost = class CanPost extends index_1.BaseController {
            test() {
                if (Object.keys(this.req.body).length) {
                    this.send("success");
                }
            }
        };
        __decorate([
            Method_1.Post("/test"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], CanPost.prototype, "test", null);
        CanPost = __decorate([
            MiddleWare_1.MiddleWare(BaseApi),
            route_1.Route("/test"), 
            __metadata('design:paramtypes', [])
        ], CanPost);
        return new Promise((resolve) => {
            Config_1.Configure({
                features: [
                    'documentation'
                ]
            });
            win_1.Listen(3000, function () {
                resolve();
            });
        });
    });
    it("Should be able to get the user greeting", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/user/greeting").end(function (err, res) {
                let { text } = res;
                must(text).equal("Hello, World");
                if (err) {
                    reject(err);
                }
                else
                    resolve();
            });
        });
    });
    it("It should be able to get the author information", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/user/info").end(function (err, res) {
                let { body } = res;
                must(body.Author).equal("Shavauhn Gabay");
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    it("It should be able to get the author information", function () {
        must(method_pre.called).true;
    });
    it("It should be able to get the author information", function () {
        must(method_post.called).true;
    });
    it("It should be able to get the author information", function () {
        return new Promise((resolve, reject) => {
            request.post("http://localhost:3000/test/test").send({
                "key": "value"
            }).end(function (err, res) {
                let { text } = res;
                must(text).equal("success");
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    it("Document", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                let { body } = res;
                must(body).true;
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    afterEach(function () {
        must(spy.calledOnce).true;
    });
    after(win_1.Close);
});
//# sourceMappingURL=express.test.js.map