import { BaseController } from './../LikeController/index';
import { Listen, Close } from "../win";
import { Route, Get, Post } from "../route";
import {Inject,Injectable} from "../IOC";
import request = require("superagent");
const must = require("must");

describe("Can-I", function () {

    before(function () {



        @Injectable
        class UserService{
            getUser(){
                return {
                    name:"Shavauhn Gabay"
                }
            }
        }
        
        

        @Route("/api")
        class TestController extends BaseController {


            @Get("/hello")
            public hello() {
                this.send("hello world");
            }

            @Inject
            @Get("/user")
            public User(service:UserService){
                this.send(service.getUser());
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


    it("should be able to make a request to the server", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/api/user").end(function (err, res) {
                let {body} = res;
                must(body.name).equal("Shavauhn Gabay")
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })

    after(Close);

})