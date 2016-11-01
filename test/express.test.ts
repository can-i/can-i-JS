import { BaseController } from './../LikeController/index';
import { Listen, Close,Configure } from "../win";
import { Route, Get, Post } from "../route";
import {Inject,Injectable} from "../IOC";
import {Document} from "../help";
import request = require("superagent");
const must = require("must");

describe("Can-I", function () {

    before(function () {

        @Injectable
        class UserService{
            getUser(){
                return {
                    Author:"Shavauhn Gabay"
                }
            }
        }
        
        @Document({
            title:"The Wolf",
            description:`The Wolf travelled by the moon light.
            As i stepped to look outside it frightened me.
            Filled with fear i ran for the door to protect my self.
            The wolf gazed at me, Majestic, panting softly in the direction
            of the abrupt movement.
            Seeing me however it does no react
            it lazily turns it's gaze back to the world.
            
            The Wolf will guide you as it has guided me.
            Once you eyes are open you too will see.
            
            In the shadows of the night the Wolf was my ally.
            and he remains...`
        })
        @Route("/Wolf")
        class WolfController extends BaseController {


            @Get("/patiences")
            public hello() {
                this.send("Hello, World");
            }

            @Inject
            @Get("/Author")
            public User(service:UserService){
                this.send(service.getUser());
            }
        }

        @Route("/fox")
        @Document({
            title:"The Fox",
            description:`The Fox at first had me perplexed seemingly
            unthreatening then I remember that the fox can be cunning and 
            should not be trusted. Given what i have seen i ran to get something
            to protect myself. I found a stick with fire a blazed.
            
            The more i tried running from the fox the more it made an appearance.
            Dashing wildly around me, forcing me into a corner. I sat by my fire light.
            
            It was not the fox i feared it was the path it found inside. Wolves by the hundred
            hunted just outside my door. 
            
            Little did i know the fox has been sent to set me on a path.
            Just like the fox blocked by the door, cunningly figured another way inside,

            How much time do i have before the wolfs figure a way inside

            I too must move cleverly if i want to last the night.` 
        })
        class FoxController extends WolfController {

            @Get("/clever")
            public hello() {
                return super.hello();
            }
        }


        @Route("/fire")
        @Document({
            title:"Fire",
            description:`The fire, like water contains a dynamic nature.
            The fire can grow, consume and wreek havoc and bring destruction.
            We all know this, but when the darkness surrounds you and
            fear creeps into your heart. Fire, can be a source of strength.
            
            It was the only thing i felt that could keep me alive.
            The Wolves surrounded my by the hundreds
            The Fox had found a way inside.
            
            This was my last defence.`
        })
        class FireController extends WolfController {
            @Post("/warmth")
            public hello() {
                return super.hello();
            }
        }


        @Route("/Day")
        @Document({
            title:"Day Night and the Blood Moon",
            description:`I sat awaiting my end.
            The fox had settled down and had fixed it's gazed on me.
            I stared back at the fox wondering what had made it stay so still.
            It appeared to waiting for something. It looked so small and harmless
            as it gazed back at me. The fox walks towards me ever so slowly to the fire.
            
            I tried waving the stick with the flame and nothing.            
            He creeps closer and closer.
            
            I touch the fox with the fire. Surely this will send it on it's way.
            Nothing he seems to like the heat of the fire.
            
            Something was very wrong. I could not burn the fox.
            I stood up confused as to what i have just seen.
            I held the fire up and ten to twelve wolfs gazed back at me. 

            You can imagine my initial shock.
            However i did not feel fear.
            
            I walked towards them and they opened a path for me.            
            As I looked outside at the moon i realize the moon was Blood Red
            Casting the entire world in this Red Velvet undertone.
            
            What have i discovered? What secrets of the world shall I see now?
            
            Set upon a path i figured could walk. Lost within my mind a click then a spark
            
            Three Pillars:
            Protect
            Clever
            Source of Light and Guidance

            I can never forget.`
        })
        class DayNight extends WolfController {
            @Post("/Night")
            public hello() {
                return super.hello();
            }
        }


        return new Promise((resolve) => {

            Configure({
                features:['documentation']
            })
            Listen(3000, function () {
                resolve();
            })
        })

    })


    it("Wolf", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/Wolf/patiences").end(function (err, res) {
                let {text} = res;
                must(text).equal("Hello, World")
                if (err) {
                    reject(err)
                } else
                    resolve();
            })
        })
    })

    it("Fox", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/fox/clever").end(function (err, res) {
                let {text} = res;
                must(text).equal("Hello, World")
                if (err)
                    reject(err)
                else
                    resolve();
            })
        })
    })


    it("Author", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/Wolf/Author").end(function (err, res) {
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