"use strict";

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index_1 = require('./../win/index');
var Accessor_1 = require('./../win/Accessor');
var Express = require("express");
function Route() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

    return function RouteAttacher(constructor) {
        var router = Express.Router();
        var access = Accessor_1.Accessor(constructor);
        var keys = (0, _keys2.default)(access.methods || {});
        access.route_prefix = route;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                var routeOption = access.methods[key];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(routeOption), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var o = _step2.value;

                        switch (key.toLowerCase()) {
                            case 'get':
                                router.get(o.route_name, o.route_function);
                                break;
                            case 'post':
                                router.post(o.route_name, o.route_function);
                                break;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        index_1.App().use(route, router);
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map