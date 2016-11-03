"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var index_1 = require('./../Config/index');
require("reflect-metadata");
exports.Express = require("express");
__export(require("./Accessor"));
var _ = require("lodash");
var glob = require("glob");
var Path = require("path");
function BootStrap(options) {
    app = exports.Express();
    if (options === null) {
        return console.warn("No BootStrapping config.\nThe only excuse is Unit Testing!!");
    }
    options = options || {};
    var defaults = {
        controllers: Path.join(process.cwd(), "controllers"),
        services: Path.join(process.cwd(), "services")
    };
    options = _.defaultsDeep(options, defaults);
    glob.sync(options.controllers).map(require);
    glob.sync(options.services).map(require);
}
exports.BootStrap = BootStrap;
var app = void 0;
exports.App = function () {
    if (!app) {
        throw new Error("Application has not been bootstrapped");
    }
    return app;
};
var server = void 0;
function Listen() {
    app.get("/can-i/document", function (req, res, next) {
        process.nextTick(function () {
            if (index_1.configurationManager.feature.enabled('documentation')) res.send(res.locals);else {
                next();
            }
        });
    });

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    server = app.listen.apply(app, args);
}
exports.Listen = Listen;
function Close() {
    return server.close();
}
exports.Close = Close;
function GetServer() {
    return server;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map