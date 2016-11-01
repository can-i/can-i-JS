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
const index_1 = require('./../LikeController/index');
const win_1 = require("../win");
const route_1 = require("../route");
const IOC_1 = require("../IOC");
const help_1 = require("../help");
const request = require("superagent");
var must = require("must");
describe("Can-I", function () {
    before(function () {
        let UserService = class UserService {
            getUser() {
                return {
                    Author: "Shavauhn Gabay"
                };
            }
        };
        UserService = __decorate([
            IOC_1.Injectable, 
            __metadata('design:paramtypes', [])
        ], UserService);
        let ItemService = class ItemService {
            getItem() {
                return {
                    name: "GTX Titan PASCAL"
                };
            }
        };
        ItemService = __decorate([
            IOC_1.Injectable, 
            __metadata('design:paramtypes', [])
        ], ItemService);
        let UserController = class UserController extends index_1.BaseController {
            hello() {
                this.send("Hello, World");
            }
            User(service) {
                this.send(service.getUser());
            }
        };
        __decorate([
            route_1.Get("/greeting"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], UserController.prototype, "hello", null);
        __decorate([
            IOC_1.Inject,
            route_1.Get("/info"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [UserService]), 
            __metadata('design:returntype', void 0)
        ], UserController.prototype, "User", null);
        UserController = __decorate([
            help_1.Document({
                title: "User Controller",
                description: `Contains information about the user`
            }),
            route_1.Route("/user"), 
            __metadata('design:paramtypes', [])
        ], UserController);
        let ItemController = class ItemController extends index_1.BaseController {
            detail(service) {
                this.send(service.getItem());
            }
        };
        __decorate([
            route_1.Get("/detail"),
            IOC_1.Inject, 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [ItemService]), 
            __metadata('design:returntype', void 0)
        ], ItemController.prototype, "detail", null);
        ItemController = __decorate([
            route_1.Route("/item"),
            help_1.Document({
                title: "Item Controller",
                description: `Contains information about the Item`
            }), 
            __metadata('design:paramtypes', [])
        ], ItemController);
        return new Promise((resolve) => {
            win_1.Configure({
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
    it("Document", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                let { body } = res;
                console.log(body);
                must(body).true;
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    after(win_1.Close);
});
//# sourceMappingURL=express.test.js.map