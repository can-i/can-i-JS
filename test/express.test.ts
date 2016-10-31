import { BaseController } from './../LikeController/index';
import { Listen, Close } from "../win";
import { Route, Get, Post } from "../route";
import request = require("superagent");
const must = require("must");

describe("Can-I", function () {

    before(function () {
        this.timeout(5000);
        @Route("/api")
        class TestController extends BaseController {

            @Get("/hello")
            public hello() {
                this.send("hello world");
            }
        }

        @Route("/api")
        class TestController2 extends TestController {

            @Post("/hello")
            public hello() {
                return super.hello();
            }
        }

        return new Promise((resolve) => {
            Listen(3000, function () {
                resolve();
            })
        })

    })


    it("should be able to make a request to the server", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/api/hello").end(function (err, res) {
                let {text} = res;
                must(text).equal("hello world")
                if (err) {
                    reject(err)
                } else
                    resolve();
            })
        })
    })

    it("should be able to make a request to the server", function () {
        return new Promise((resolve, reject) => {
            request.post("http://localhost:3000/api/hello").end(function (err, res) {
                let {text} = res;
                must(text).equal("hello world")
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })

    after(Close);

})