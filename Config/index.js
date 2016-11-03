"use strict";

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('reflect-metadata');
var ConfigurationManager_1 = require('./ConfigurationManager');
var ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
exports.configurationManager = ServiceBuilder_1.ServiceBuilder.BuildService(ConfigurationManager_1.ConfigurationManager);
function Configure() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var features = options.features || [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(features), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var f = _step.value;

            exports.configurationManager.feature.enable(f);
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
}
exports.Configure = Configure;
//# sourceMappingURL=index.js.map