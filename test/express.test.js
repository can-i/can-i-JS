"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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
require('source-map-support/register');
var win_1 = require("../win");
var index_1 = require('./../LikeController/index');
var Singleton_1 = require("../IOC/Singleton");
var Route_1 = require("../route/Route");
var Config_1 = require("../Config");
var Method_1 = require("../route/Method");
var IOC_1 = require("../IOC");
var help_1 = require("../help");
var MiddleWare_1 = require("../MiddleWare");
var request = require("superagent");
var sinon = require("sinon");
var must = require("must");
var method_pre = sinon.spy();
var method_post = sinon.spy();
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
    before(function () {
        win_1.BootStrap(null);
        var Database = function () {
            function Database() {
                (0, _classCallCheck3.default)(this, Database);

                spy();
            }

            (0, _createClass3.default)(Database, [{
                key: "getUser",
                value: function getUser() {
                    return {
                        Author: "Shavauhn Gabay"
                    };
                }
            }, {
                key: "getItem",
                value: function getItem() {
                    return {
                        name: "GTX Titan PASCAL"
                    };
                }
            }]);
            return Database;
        }();
        Database = __decorate([Singleton_1.Singleton, __metadata('design:paramtypes', [])], Database);
        var UserService = function () {
            function UserService(db) {
                (0, _classCallCheck3.default)(this, UserService);

                this.db = db;
            }

            (0, _createClass3.default)(UserService, [{
                key: "getUser",
                value: function getUser() {
                    return this.db.getUser();
                }
            }]);
            return UserService;
        }();
        UserService = __decorate([IOC_1.Injectable, __metadata('design:paramtypes', [Database])], UserService);
        var ItemService = function () {
            function ItemService() {
                (0, _classCallCheck3.default)(this, ItemService);
            }

            (0, _createClass3.default)(ItemService, [{
                key: "getItem",
                value: function getItem() {}
            }]);
            return ItemService;
        }();
        ItemService = __decorate([IOC_1.Injectable, __metadata('design:paramtypes', [])], ItemService);
        var UserController = function (_index_1$BaseControll) {
            (0, _inherits3.default)(UserController, _index_1$BaseControll);

            function UserController(service) {
                (0, _classCallCheck3.default)(this, UserController);

                var _this = (0, _possibleConstructorReturn3.default)(this, (UserController.__proto__ || (0, _getPrototypeOf2.default)(UserController)).call(this));

                _this.service = service;
                return _this;
            }

            (0, _createClass3.default)(UserController, [{
                key: "hello",
                value: function hello() {
                    this.send("Hello, World");
                }
            }, {
                key: "User",
                value: function User() {
                    this.send(this.service.getUser());
                }
            }]);
            return UserController;
        }(index_1.BaseController);
        __decorate([Method_1.Get("/greeting"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], UserController.prototype, "hello", null);
        __decorate([Method_1.Get("/info"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], UserController.prototype, "User", null);
        UserController = __decorate([help_1.Document({
            title: "User Controller",
            description: "Contains information about the user"
        }), Route_1.Route("/user"), __metadata('design:paramtypes', [UserService])], UserController);
        var ItemController = function (_index_1$BaseControll2) {
            (0, _inherits3.default)(ItemController, _index_1$BaseControll2);

            function ItemController(service) {
                (0, _classCallCheck3.default)(this, ItemController);

                var _this2 = (0, _possibleConstructorReturn3.default)(this, (ItemController.__proto__ || (0, _getPrototypeOf2.default)(ItemController)).call(this));

                _this2.service = service;
                return _this2;
            }

            (0, _createClass3.default)(ItemController, [{
                key: "detail",
                value: function detail() {
                    this.send(this.service.getItem());
                }
            }]);
            return ItemController;
        }(index_1.BaseController);
        __decorate([Method_1.Get("/detail"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ItemController.prototype, "detail", null);
        ItemController = __decorate([Route_1.Route("/item"), help_1.Document({
            title: "Item Controller",
            description: "Contains information about the Item"
        }), __metadata('design:paramtypes', [ItemService])], ItemController);
        var CanPost = function (_index_1$BaseControll3) {
            (0, _inherits3.default)(CanPost, _index_1$BaseControll3);

            function CanPost() {
                (0, _classCallCheck3.default)(this, CanPost);
                return (0, _possibleConstructorReturn3.default)(this, (CanPost.__proto__ || (0, _getPrototypeOf2.default)(CanPost)).apply(this, arguments));
            }

            (0, _createClass3.default)(CanPost, [{
                key: "test",
                value: function test() {
                    if ((0, _keys2.default)(this.req.body).length) {
                        this.send("success");
                    }
                }
            }]);
            return CanPost;
        }(index_1.BaseController);
        __decorate([Method_1.Post("/test"), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], CanPost.prototype, "test", null);
        CanPost = __decorate([MiddleWare_1.MiddleWare(BaseApi), Route_1.Route("/test"), __metadata('design:paramtypes', [])], CanPost);
        return new _promise2.default(function (resolve) {
            Config_1.Configure({
                features: ['documentation']
            });
            win_1.Listen(3000, function () {
                resolve();
            });
        });
    });
    it("Should be able to get the user greeting", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/user/greeting").end(function (err, res) {
                var text = res.text;

                must(text).equal("Hello, World");
                if (err) {
                    reject(err);
                } else resolve();
            });
        });
    });
    it("It should be able to get the author information", function () {
        return new _promise2.default(function (resolve, reject) {
            request.get("http://localhost:3000/user/info").end(function (err, res) {
                var body = res.body;

                must(body.Author).equal("Shavauhn Gabay");
                if (err) reject(err);else resolve();
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
        return new _promise2.default(function (resolve, reject) {
            request.post("http://localhost:3000/test/test").send({
                "key": "value"
            }).end(function (err, res) {
                var text = res.text;

                must(text).equal("success");
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
    afterEach(function () {
        must(spy.calledOnce).true;
    });
    after(win_1.Close);
});
//# sourceMappingURL=express.test.js.map