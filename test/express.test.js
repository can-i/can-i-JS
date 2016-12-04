"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("source-map-support/register");
var Win_1 = require("../Win");
var LikeController_1 = require("./../LikeController");
var Singleton_1 = require("../IOC/Singleton");
var Route_1 = require("../Route");
var Config_1 = require("../Config");
var Method_1 = require("../Route/Method");
var IOC_1 = require("../IOC");
var Help_1 = require("../Help");
var MiddleWare_1 = require("../MiddleWare");
var Work_1 = require("../Work");
var Log_1 = require("../Utility/Log");
var request = require("superagent");
var sinon = require("sinon");
var must = require("must");
var method_pre = sinon.spy();
var method_post = sinon.spy();
var jobspy = sinon.spy();
Log_1.Logger.Application("start-----------------------------------------------------------");
var parser = require("body-parser");
var BaseApi = MiddleWare_1.Stack(function (req, res, next) {
    method_pre();
    next();
}, parser.json(), function (req, res, next) {
    method_post();
    next();
});
describe("Can-I", function () {
    var spy = sinon.spy();
    var cronspy = sinon.spy();
    before(function () {
        Win_1.BootStrap(null);
        var Database = (function () {
            function Database() {
                spy();
            }
            Database.prototype.getUser = function () {
                return {
                    Author: "Shavauhn Gabay"
                };
            };
            Database.prototype.getItem = function () {
                return {
                    name: "GTX Titan PASCAL"
                };
            };
            return Database;
        }());
        Database = __decorate([
            Singleton_1.Singleton,
            __metadata("design:paramtypes", [])
        ], Database);
        var UserService = (function () {
            function UserService(db) {
                this.db = db;
            }
            UserService.prototype.getUser = function () {
                return this.db.getUser();
            };
            return UserService;
        }());
        UserService = __decorate([
            IOC_1.Injectable,
            __metadata("design:paramtypes", [Database])
        ], UserService);
        var ItemService = (function () {
            function ItemService() {
            }
            ItemService.prototype.getItem = function () {
            };
            return ItemService;
        }());
        ItemService = __decorate([
            IOC_1.Injectable,
            __metadata("design:paramtypes", [])
        ], ItemService);
        var UserController = (function (_super) {
            __extends(UserController, _super);
            function UserController(service) {
                var _this = _super.call(this) || this;
                _this.service = service;
                return _this;
            }
            UserController.prototype.hello = function () {
                this.send("Hello, World");
            };
            UserController.prototype.User = function () {
                this.send(this.service.getUser());
            };
            return UserController;
        }(LikeController_1.BaseController));
        __decorate([
            Method_1.Get("/greeting"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], UserController.prototype, "hello", null);
        __decorate([
            Method_1.Get("/info"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], UserController.prototype, "User", null);
        UserController = __decorate([
            Help_1.Document({
                title: "User Controller",
                description: "Contains information about the user"
            }),
            Route_1.Route("/user"),
            __metadata("design:paramtypes", [UserService])
        ], UserController);
        var ItemController = (function (_super) {
            __extends(ItemController, _super);
            function ItemController(service) {
                var _this = _super.call(this) || this;
                _this.service = service;
                return _this;
            }
            ItemController.prototype.detail = function () {
                this.send(this.service.getItem());
            };
            return ItemController;
        }(LikeController_1.BaseController));
        __decorate([
            Method_1.Get("/detail"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ItemController.prototype, "detail", null);
        ItemController = __decorate([
            Route_1.Route("/item"),
            Help_1.Document({
                title: "Item Controller",
                description: "Contains information about the Item"
            }),
            __metadata("design:paramtypes", [ItemService])
        ], ItemController);
        var CanPost = (function (_super) {
            __extends(CanPost, _super);
            function CanPost() {
                return _super.apply(this, arguments) || this;
            }
            CanPost.prototype.test = function () {
                if (Object.keys(this.req.body).length) {
                    this.send("success");
                }
            };
            CanPost.prototype.post = function (next) {
                console.log("spy");
                jobspy();
                next();
            };
            CanPost.prototype.CronTask = function (next) {
                console.log("cron spy");
                cronspy();
                next();
            };
            return CanPost;
        }(LikeController_1.BaseController));
        __decorate([
            Method_1.Post("/test"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], CanPost.prototype, "test", null);
        __decorate([
            Work_1.Job({
                ever: 1000
            }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], CanPost.prototype, "post", null);
        __decorate([
            Work_1.Job({
                cron: "* * * * * *"
            }),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Function]),
            __metadata("design:returntype", void 0)
        ], CanPost.prototype, "CronTask", null);
        CanPost = __decorate([
            MiddleWare_1.MiddleWare(BaseApi),
            Route_1.Route("/test"),
            __metadata("design:paramtypes", [])
        ], CanPost);
        return new Promise(function (resolve) {
            var keep_going = function () {
                Config_1.Configure({
                    features: [
                        'documentation'
                    ]
                });
                Win_1.Listen(3000, function () {
                    resolve();
                });
            };
            keep_going();
            // if (State.Ready) {
            //     keep_going();
            // }else{
            //     Event.on("can-i:bootstrapped",keep_going)
            // }
        });
    });
    it("Testing if Controller Jobs work with spy", function (next) {
        this.timeout(5000);
        setTimeout(function () {
            must(jobspy.callCount).equal(2);
            next();
        }, 2000 + 100);
    });
    it("Testing if Controller Jobs work with cron spy", function (next) {
        this.timeout(20000);
        setTimeout(function () {
            try {
                must(cronspy.callCount).equal(2);
                next();
            }
            catch (e) {
                next(e);
            }
        }, 10);
    });
    it("Should be able to get the user greeting", function () {
        return new Promise(function (resolve, reject) {
            request.get("http://localhost:3000/user/greeting").end(function (err, res) {
                var text = res.text;
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
        return new Promise(function (resolve, reject) {
            request.get("http://localhost:3000/user/info").end(function (err, res) {
                var body = res.body;
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
        return new Promise(function (resolve, reject) {
            request.post("http://localhost:3000/test/test").send({
                "key": "value"
            }).end(function (err, res) {
                var text = res.text;
                must(text).equal("success");
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    it("Document", function () {
        return new Promise(function (resolve, reject) {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                var body = res.body;
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
    after(Win_1.Close);
});
//The Wolf, The Fire, The Fox, and The Blood Moon 
//# sourceMappingURL=express.test.js.map