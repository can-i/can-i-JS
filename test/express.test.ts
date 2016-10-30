import { BaseController } from './../LikeController/index';
import {Listen,Close} from "../win";
import {Route,Get} from "../route";
import request = require("superagent");
const must  = require("must");

describe("Can-I",function(){
    
    before(function(){

        @Route("/api")
        class TestController extends BaseController{

            @Get("/hello")
            public hello(){
                this.send("hello world");
            }
        }

        return new Promise((resolve)=>{
            Listen(3000, function () {
                console.log("server booted");
                resolve();
            })
        })

    })


    it("should be able to make a request to the server",function(){
        return new Promise((resolve,reject)=>{
            request.get("http://localhost:3000/api/hello").end(function(err,res){                
                let {text} = res;                
                must(text).equal("hello world")
                resolve();
            })
        })
    })

    after(Close);

})