"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const index_1 = require('./../LikeController/index');
const win_1 = require("../win");
const route_1 = require("../route");
const request = require("superagent");
const must = require("must");
describe("Can-I", function () {
    before(function () {
        this.timeout(5000);
        let TestController = class TestController extends index_1.BaseController {
            hello() {
                this.send("hello world");
            }
        };
        __decorate([
            route_1.Get("/hello")
        ], TestController.prototype, "hello", null);
        TestController = __decorate([
            route_1.Route("/api")
        ], TestController);
        let TestController2 = class TestController2 extends TestController {
            hello() {
                return super.hello();
            }
        };
        __decorate([
            route_1.Post("/hello")
        ], TestController2.prototype, "hello", null);
        TestController2 = __decorate([
            route_1.Route("/api")
        ], TestController2);
        return new Promise((resolve) => {
            win_1.Listen(3000, function () {
                resolve();
            });
        });
    });
    it("should be able to make a request to the server", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/api/hello").end(function (err, res) {
                let { text } = res;
                must(text).equal("hello world");
                if (err) {
                    reject(err);
                }
                else
                    resolve();
            });
        });
    });
    it("should be able to make a request to the server", function () {
        return new Promise((resolve, reject) => {
            request.post("http://localhost:3000/api/hello").end(function (err, res) {
                let { text } = res;
                must(text).equal("hello world");
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