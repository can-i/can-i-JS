import { Listen, Close,BootStrap} from "../win";
import { BaseController } from './../LikeController/index';

import {Configure} from "../Config"
import { Route, Get, Post } from "../route";
import { Inject, Injectable } from "../IOC";
import { Document } from "../help";
import {MiddleWare,Stack} from "../MiddleWare";
import request = require("superagent");
var must = require("must");


var parser = require("body-parser");
let BaseApi = Stack(parser.json());

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


        @MiddleWare(BaseApi)
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

    it("Document", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                let {body} = res;
                console.log(body);
                
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