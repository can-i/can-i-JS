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
const must = require("must");
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
        let WolfController = class WolfController extends index_1.BaseController {
            hello() {
                this.send("Hello, World");
            }
            User(service) {
                this.send(service.getUser());
            }
        };
        __decorate([
            route_1.Get("/patiences"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], WolfController.prototype, "hello", null);
        __decorate([
            IOC_1.Inject,
            route_1.Get("/Author"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [UserService]), 
            __metadata('design:returntype', void 0)
        ], WolfController.prototype, "User", null);
        WolfController = __decorate([
            help_1.Document({
                title: "The Wolf",
                description: `The Wolf travelled by the moon light.
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
            }),
            route_1.Route("/Wolf"), 
            __metadata('design:paramtypes', [])
        ], WolfController);
        let FoxController = class FoxController extends WolfController {
            hello() {
                return super.hello();
            }
        };
        __decorate([
            route_1.Get("/clever"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FoxController.prototype, "hello", null);
        FoxController = __decorate([
            route_1.Route("/fox"),
            help_1.Document({
                title: "The Fox",
                description: `The Fox at first had me perplexed seemingly
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
            }), 
            __metadata('design:paramtypes', [])
        ], FoxController);
        let FireController = class FireController extends WolfController {
            hello() {
                return super.hello();
            }
        };
        __decorate([
            route_1.Post("/warmth"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], FireController.prototype, "hello", null);
        FireController = __decorate([
            route_1.Route("/fire"),
            help_1.Document({
                title: "Fire",
                description: `The fire, like water contains a dynamic nature.
            The fire can grow, consume and wreek havoc and bring destruction.
            We all know this, but when the darkness surrounds you and
            fear creeps into your heart. Fire, can be a source of strength.
            
            It was the only thing i felt that could keep me alive.
            The Wolves surrounded my by the hundreds
            The Fox had found a way inside.
            
            This was my last defence.`
            }), 
            __metadata('design:paramtypes', [])
        ], FireController);
        let DayNight = class DayNight extends WolfController {
            hello() {
                return super.hello();
            }
        };
        __decorate([
            route_1.Post("/Night"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], DayNight.prototype, "hello", null);
        DayNight = __decorate([
            route_1.Route("/Day"),
            help_1.Document({
                title: "Day Night and the Blood Moon",
                description: `I sat awaiting my end.
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
            }), 
            __metadata('design:paramtypes', [])
        ], DayNight);
        return new Promise((resolve) => {
            win_1.Configure({
                features: ['documentation']
            });
            win_1.Listen(3000, function () {
                resolve();
            });
        });
    });
    it("Wolf", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/Wolf/patiences").end(function (err, res) {
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
    it("Fox", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/fox/clever").end(function (err, res) {
                let { text } = res;
                must(text).equal("Hello, World");
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
    it("Author", function () {
        return new Promise((resolve, reject) => {
            request.get("http://localhost:3000/Wolf/Author").end(function (err, res) {
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