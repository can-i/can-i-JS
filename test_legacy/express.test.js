"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _metadata = require("babel-runtime/core-js/reflect/metadata");

var _metadata2 = _interopRequireDefault(_metadata);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof _metadata2.default === "function") return (0, _metadata2.default)(k, v);
};
var index_1 = require('./../LikeController/index');
var win_1 = require("../win");
var route_1 = require("../route");
var IOC_1 = require("../IOC");
var help_1 = require("../help");
var request = require("superagent");
var must = require("must");
describe("Can-I", function () {
    before(function () {
        var UserService = function () {
            function UserService() {
                (0, _classCallCheck3.default)(this, UserService);
            }

            (0, _createClass3.default)(UserService, [{
                key: "getUser",
                value: function getUser() {
                    return {
                        Author: "Shavauhn Gabay"
                    };
                }
            }]);
            return UserService;
        }();
        UserService = __decorate([IOC_1.Injectable, __metadata('design:paramtypes', [])], UserService);
        var WolfController = function (_index_1$BaseControll) {
            (0, _inherits3.default)(WolfController, _index_1$BaseControll);

            function WolfController() {
                (0, _classCallCheck3.default)(this, WolfController);
                return (0, _possibleConstructorReturn3.default)(this, (WolfController.__proto__ || (0, _getPrototypeOf2.default)(WolfController)).apply(this, arguments));
            }

            (0, _createClass3.default)(WolfController, [{
                key: "hello",
                value: function hello() {
                    this.send("Hello, World");
                }
            }, {
                key: "User",
                value: function User(service) {
                    this.send(service.getUser());
                }
            }]);
            return WolfController;
        }(index_1.BaseController);
        __decorate([route_1.Get("/patiences"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], WolfController.prototype, "hello", null);
        __decorate([IOC_1.Inject, route_1.Get("/Author"), __metadata('design:type', Function), __metadata('design:paramtypes', [UserService]), __metadata('design:returntype', void 0)], WolfController.prototype, "User", null);
        WolfController = __decorate([help_1.Document({
            title: "The Wolf",
            description: "The Wolf travelled by the moon light.\n            As i stepped to look outside it frightened me.\n            Filled with fear i ran for the door to protect my self.\n            The wolf gazed at me, Majestic, panting softly in the direction\n            of the abrupt movement.\n            Seeing me however it does no react\n            it lazily turns it's gaze back to the world.\n            \n            The Wolf will guide you as it has guided me.\n            Once you eyes are open you too will see.\n            \n            In the shadows of the night the Wolf was my ally.\n            and he remains..."
        }), route_1.Route("/Wolf"), __metadata('design:paramtypes', [])], WolfController);
        var FoxController = function (_WolfController) {
            (0, _inherits3.default)(FoxController, _WolfController);

            function FoxController() {
                (0, _classCallCheck3.default)(this, FoxController);
                return (0, _possibleConstructorReturn3.default)(this, (FoxController.__proto__ || (0, _getPrototypeOf2.default)(FoxController)).apply(this, arguments));
            }

            (0, _createClass3.default)(FoxController, [{
                key: "hello",
                value: function hello() {
                    return (0, _get3.default)(FoxController.prototype.__proto__ || (0, _getPrototypeOf2.default)(FoxController.prototype), "hello", this).call(this);
                }
            }]);
            return FoxController;
        }(WolfController);
        __decorate([route_1.Get("/clever"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], FoxController.prototype, "hello", null);
        FoxController = __decorate([route_1.Route("/fox"), help_1.Document({
            title: "The Fox",
            description: "The Fox at first had me perplexed seemingly\n            unthreatening then I remember that the fox can be cunning and \n            should not be trusted. Given what i have seen i ran to get something\n            to protect myself. I found a stick with fire a blazed.\n            \n            The more i tried running from the fox the more it made an appearance.\n            Dashing wildly around me, forcing me into a corner. I sat by my fire light.\n            \n            It was not the fox i feared it was the path it found inside. Wolves by the hundred\n            hunted just outside my door. \n            \n            Little did i know the fox has been sent to set me on a path.\n            Just like the fox blocked by the door, cunningly figured another way inside,\n\n            How much time do i have before the wolfs figure a way inside\n\n            I too must move cleverly if i want to last the night."
        }), __metadata('design:paramtypes', [])], FoxController);
        var FireController = function (_WolfController2) {
            (0, _inherits3.default)(FireController, _WolfController2);

            function FireController() {
                (0, _classCallCheck3.default)(this, FireController);
                return (0, _possibleConstructorReturn3.default)(this, (FireController.__proto__ || (0, _getPrototypeOf2.default)(FireController)).apply(this, arguments));
            }

            (0, _createClass3.default)(FireController, [{
                key: "hello",
                value: function hello() {
                    return (0, _get3.default)(FireController.prototype.__proto__ || (0, _getPrototypeOf2.default)(FireController.prototype), "hello", this).call(this);
                }
            }]);
            return FireController;
        }(WolfController);
        __decorate([route_1.Post("/warmth"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], FireController.prototype, "hello", null);
        FireController = __decorate([route_1.Route("/fire"), help_1.Document({
            title: "Fire",
            description: "The fire, like water contains a dynamic nature.\n            The fire can grow, consume and wreek havoc and bring destruction.\n            We all know this, but when the darkness surrounds you and\n            fear creeps into your heart. Fire, can be a source of strength.\n            \n            It was the only thing i felt that could keep me alive.\n            The Wolves surrounded my by the hundreds\n            The Fox had found a way inside.\n            \n            This was my last defence."
        }), __metadata('design:paramtypes', [])], FireController);
        var DayNight = function (_WolfController3) {
            (0, _inherits3.default)(DayNight, _WolfController3);

            function DayNight() {
                (0, _classCallCheck3.default)(this, DayNight);
                return (0, _possibleConstructorReturn3.default)(this, (DayNight.__proto__ || (0, _getPrototypeOf2.default)(DayNight)).apply(this, arguments));
            }

            (0, _createClass3.default)(DayNight, [{
                key: "hello",
                value: function hello() {
                    return (0, _get3.default)(DayNight.prototype.__proto__ || (0, _getPrototypeOf2.default)(DayNight.prototype), "hello", this).call(this);
                }
            }]);
            return DayNight;
        }(WolfController);
        __decorate([route_1.Post("/Night"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], DayNight.prototype, "hello", null);
        DayNight = __decorate([route_1.Route("/Day"), help_1.Document({
            title: "Day Night and the Blood Moon",
            description: "I sat awaiting my end.\n            The fox had settled down and had fixed it's gazed on me.\n            I stared back at the fox wondering what had made it stay so still.\n            It appeared to waiting for something. It looked so small and harmless\n            as it gazed back at me. The fox walks towards me ever so slowly to the fire.\n            \n            I tried waving the stick with the flame and nothing.            \n            He creeps closer and closer.\n            \n            I touch the fox with the fire. Surely this will send it on it's way.\n            Nothing he seems to like the heat of the fire.\n            \n            Something was very wrong. I could not burn the fox.\n            I stood up confused as to what i have just seen.\n            I held the fire up and ten to twelve wolfs gazed back at me. \n\n            You can imagine my initial shock.\n            However i did not feel fear.\n            \n            I walked towards them and they opened a path for me.            \n            As I looked outside at the moon i realize the moon was Blood Red\n            Casting the entire world in this Red Velvet undertone.\n            \n            What have i discovered? What secrets of the world shall I see now?\n            \n            Set upon a path i figured could walk. Lost within my mind a click then a spark\n            \n            Three Pillars:\n            Protect\n            Clever\n            Source of Light and Guidance\n\n            I can never forget."
        }), __metadata('design:paramtypes', [])], DayNight);
        return new _promise2.default(function (resolve) {
            win_1.Configure({
                features: ['documentation']
            });
            win_1.Listen(3000, function () {
                resolve();
            });
        });
    });
    it("Wolf", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/Wolf/patiences").end(function (err, res) {
                var text = res.text;

                must(text).equal("Hello, World");
                if (err) {
                    reject(err);
                } else resolve();
            });
        });
    });
    it("Fox", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/fox/clever").end(function (err, res) {
                var text = res.text;

                must(text).equal("Hello, World");
                if (err) reject(err);else resolve();
            });
        });
    });
    it("Author", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/Wolf/Author").end(function (err, res) {
                var body = res.body;

                must(body.Author).equal("Shavauhn Gabay");
                if (err) reject(err);else resolve();
            });
        });
    });
    it("Document", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/can-i/document").end(function (err, res) {
                var body = res.body;

                must(body).true;
                if (err) reject(err);else resolve();
            });
        });
    });
    after(win_1.Close);
});
//# sourceMappingURL=express.test.js.map