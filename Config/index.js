"use strict";
require("reflect-metadata");
var ConfigurationManager_1 = require("./ConfigurationManager");
var index_1 = require("../Win/index");
var Log_1 = require("../Utility/Log");
var r = ConfigurationManager_1.ConfigurationFactory.ConfigurationManager();
if (r === null) {
    throw new Error("Fatal Error, failed to build Configuration Manager Service");
}
exports.configurationManager = r;
function Configure(options) {
    index_1.OnReady(function () {
        Log_1.AppLog.info("adding configuraion");
        options = options || {};
        var features = options.features || [];
        for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
            var f = features_1[_i];
            exports.configurationManager.feature.enable(f);
        }
    });
}
exports.Configure = Configure;
//# sourceMappingURL=index.js.map