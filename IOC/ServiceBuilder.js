"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getMetadata = require("babel-runtime/core-js/reflect/get-metadata");

var _getMetadata2 = _interopRequireDefault(_getMetadata);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = require("babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accessor_1 = require('./../win/Accessor');
var IOC_CONTAINER = new _map2.default();
var ioc = IOC_CONTAINER;
var Singleton = new _map2.default();
var error = "\nCannot create and instance of Static Builder Class.\nMethods need to be used Statictically\n\n".trim();
var metadata_error = "\nThere doesn't seem to be any metadata generated from your classes.\nYou can read more about metadata here: https://www.npmjs.com/package/reflect-metadata\nYou might be missing the following in your typescript file\n\n{\n    \"compilerOptions\": {\n        \"experimentalDecorators\": true,\n        \"emitDecoratorMetadata\": true\n    }\n}\n".trim();

var ServiceBuilder = function () {
    function ServiceBuilder() {
        (0, _classCallCheck3.default)(this, ServiceBuilder);

        throw new Error(error);
    }

    (0, _createClass3.default)(ServiceBuilder, null, [{
        key: "ConstructService",
        value: function ConstructService(target) {
            var needs = (0, _getMetadata2.default)("design:paramtypes", target);
            if (!needs) {
                console.warn(metadata_error);
                needs = [];
            }
            needs = needs.map(ServiceBuilder.BuildService);
            return new (Function.prototype.bind.apply(target, [null].concat((0, _toConsumableArray3.default)(needs))))();
        }
    }, {
        key: "ConstructSingleton",
        value: function ConstructSingleton(target) {
            if (Singleton.has(target)) {
                return Singleton.get(target);
            } else {
                var instance = ServiceBuilder.ConstructService(target);
                Singleton.set(target, instance);
                return instance;
            }
        }
    }, {
        key: "BuildService",
        value: function BuildService(target) {
            if (!ServiceBuilder.isManual(target) && !ServiceBuilder.isIOCCLASS(target)) {
                throw new Error("class " + target.name + " is not injectable");
            }
            if (ServiceBuilder.isSingletonConstruct(target)) {
                return ServiceBuilder.ConstructSingleton(target);
            } else {
                return ServiceBuilder.ConstructService(target);
            }
        }
    }, {
        key: "isIOCCLASS",
        value: function isIOCCLASS(target) {
            return ioc.has(target);
        }
    }, {
        key: "isManual",
        value: function isManual(target) {}
    }, {
        key: "isSingletonConstruct",
        value: function isSingletonConstruct(target) {
            var access = Accessor_1.Accessor(target);
            return access.singleton;
        }
    }, {
        key: "getServiceMethodNeeds",
        value: function getServiceMethodNeeds(target, key) {
            var access = Accessor_1.Accessor(target);
            var needs = (0, _getMetadata2.default)("design:paramtypes", target, key);
            if (needs) {
                needs = needs.map(ServiceBuilder.BuildService);
            }
            return needs || [];
        }
    }, {
        key: "Injectable",
        value: function Injectable(constructor) {
            ioc.set(constructor, constructor);
        }
    }, {
        key: "InjectWith",
        value: function InjectWith() {
            for (var _len = arguments.length, _args = Array(_len), _key = 0; _key < _len; _key++) {
                _args[_key] = arguments[_key];
            }

            var target = _args[0],
                key = _args[1],
                args = _args[2];

            var access = Accessor_1.Accessor(target);
            access.injectWith = args;
            if (Array.isArray(key) && !args) {
                access.injectWith = {
                    default: key
                };
            } else {
                var i = access.injectWith = access.injectWith || {};
                i[key] = args;
            }
        }
    }, {
        key: "MarkSingleton",
        value: function MarkSingleton(constructor) {
            var access = Accessor_1.Accessor(constructor);
            access.singleton = true;
        }
    }]);
    return ServiceBuilder;
}();

exports.ServiceBuilder = ServiceBuilder;
//# sourceMappingURL=ServiceBuilder.js.map