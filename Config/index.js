"use strict";
require("reflect-metadata");
var ConfigurationManager_1 = require("./ConfigurationManager");
var ServiceBuilder_1 = require("./../IOC/ServiceBuilder");
exports.configurationManager = ServiceBuilder_1.ServiceBuilder.BuildService(ConfigurationManager_1.ConfigurationManager);
function Configure(options) {
    options = options || {};
    var features = options.features || [];
    for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
        var f = features_1[_i];
        exports.configurationManager.feature.enable(f);
    }
}
exports.Configure = Configure;
//# sourceMappingURL=index.js.map