"use strict";
require('reflect-metadata');
const ConfigurationManager_1 = require('./ConfigurationManager');
const ServiceBuilder_1 = require('./../IOC/ServiceBuilder');
exports.configurationManager = ServiceBuilder_1.ServiceBuilder.BuildService(ConfigurationManager_1.ConfigurationManager);
function Configure(options) {
    options = options || {};
    let features = options.features || [];
    for (let f of features) {
        exports.configurationManager.feature.enable(f);
    }
}
exports.Configure = Configure;
//# sourceMappingURL=index.js.map