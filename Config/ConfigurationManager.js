"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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
var AppGetter_1 = require('./AppGetter');
var Singleton_1 = require("../IOC/Singleton");
var Feature_1 = require("../Config/Feature");
var ConfigurationManager = function (_AppGetter_1$AppGette) {
    (0, _inherits3.default)(ConfigurationManager, _AppGetter_1$AppGette);

    function ConfigurationManager(_feature) {
        (0, _classCallCheck3.default)(this, ConfigurationManager);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ConfigurationManager.__proto__ || (0, _getPrototypeOf2.default)(ConfigurationManager)).call(this));

        _this._feature = _feature;
        return _this;
    }

    (0, _createClass3.default)(ConfigurationManager, [{
        key: "feature",
        get: function get() {
            return this._feature;
        }
    }]);
    return ConfigurationManager;
}(AppGetter_1.AppGetter);
ConfigurationManager = __decorate([Singleton_1.Singleton, __metadata('design:paramtypes', [Feature_1.Feature])], ConfigurationManager);
exports.ConfigurationManager = ConfigurationManager;
//# sourceMappingURL=ConfigurationManager.js.map