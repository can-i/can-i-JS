"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var win_1 = require("../win");
var index_1 = require('./../Config/index');

var Controller = function Controller() {
    (0, _classCallCheck3.default)(this, Controller);
};

exports.Controller = Controller;

var ControllerConfig = function (_Controller) {
    (0, _inherits3.default)(ControllerConfig, _Controller);

    function ControllerConfig() {
        (0, _classCallCheck3.default)(this, ControllerConfig);
        return (0, _possibleConstructorReturn3.default)(this, (ControllerConfig.__proto__ || (0, _getPrototypeOf2.default)(ControllerConfig)).apply(this, arguments));
    }

    (0, _createClass3.default)(ControllerConfig, [{
        key: "set_up_controller",
        value: function set_up_controller(controller, req, res, next) {
            var c = controller;
            c.req = req;
            c.res = res;
            c.next = next;
        }
    }]);
    return ControllerConfig;
}(Controller);

exports.ControllerConfig = ControllerConfig;

var BaseController = function (_Controller2) {
    (0, _inherits3.default)(BaseController, _Controller2);

    function BaseController() {
        (0, _classCallCheck3.default)(this, BaseController);
        return (0, _possibleConstructorReturn3.default)(this, (BaseController.__proto__ || (0, _getPrototypeOf2.default)(BaseController)).call(this));
    }

    (0, _createClass3.default)(BaseController, [{
        key: "onInit",
        value: function onInit() {}
    }, {
        key: "sendFile",
        value: function sendFile() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.res.sendFile.apply(this.res, args);
        }
    }, {
        key: "status",
        value: function status() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.res.status.apply(this.res, args);
        }
    }, {
        key: "send",
        value: function send() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            this.res.send.apply(this.res, args);
        }
    }, {
        key: "ConfigurationManager",
        get: function get() {
            return index_1.configurationManager;
        }
    }, {
        key: "Server",
        get: function get() {
            return win_1.GetServer();
        }
    }, {
        key: "App",
        get: function get() {
            return win_1.App();
        }
    }, {
        key: "features",
        get: function get() {
            return this.ConfigurationManager.feature;
        }
    }, {
        key: "session",
        get: function get() {
            return this.req.session;
        },
        set: function set(val) {
            this.req.session = val;
        }
    }, {
        key: "body",
        get: function get() {
            return this.req.body;
        }
    }]);
    return BaseController;
}(Controller);

BaseController.methods = {};
exports.BaseController = BaseController;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=index.js.map