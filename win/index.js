"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var index_1 = require("./../Event/index");
var index_2 = require("./../Config/index");
var consolidate = require("consolidate");
require("reflect-metadata");
exports.Express = require("express");
__export(require("./Accessor"));
var _ = require("lodash");
var glob = require("glob");
var Path = require("path");
function BootStrap(options) {
    app = exports.Express();
    if (options === null) {
        console.warn("No BootStrapping config.\nThe only excuse is Unit Testing!!");
    }
    options = options || {};
    var defaults = {
        controllers: Path.join(process.cwd(), "controllers"),
        services: Path.join(process.cwd(), "services"),
        views: Path.join(process.cwd(), "views"),
        engine: {
            extension: 'html',
            engineName: "vash",
            engineConfig: null
        }
    };
    options = _.defaultsDeep(options, defaults);
    glob.sync(options.controllers + "/**/*.js").filter(function (x) { return /.js$/.test(x); }).map(function (x) {
        return x;
    }).map(require);
    glob.sync(options.services + "/**/*.js").filter(function (x) { return /.js$/.test(x); }).map(require);
    var e = options.engine;
    app.set('views', options.views);
    app.set('view engine', e.extension);
    app.engine(e.extension, consolidate[e.engineName]);
    index_1.Event.emit("can-i:bootstrapped");
    return app;
}
exports.BootStrap = BootStrap;
var app;
exports.App = function () {
    if (!app) {
        throw new Error("Application has not been bootstrapped");
    }
    return app;
};
var server;
function Listen() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    app.get("/can-i/document", function (req, res, next) {
        process.nextTick(function () {
            if (index_2.configurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    });
    server = app.listen.apply(app, args);
}
exports.Listen = Listen;
function Close() {
    server.close();
    return this;
}
exports.Close = Close;
function GetServer() {
    return server;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map