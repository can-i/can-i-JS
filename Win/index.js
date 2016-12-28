"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require("reflect-metadata");
var Config_1 = require("./../Config");
var consolidate = require("consolidate");
var Application_1 = require("./Application");
var _ = require("lodash");
exports.Express = require("express");
__export(require("./Accessor"));
var Constant_1 = require("./Constant");
var EXPRESS_BASED_APPLICATION_KEY = "EXPRESS_BASED_APPLICATION_KEY";
var application = Constant_1.Constant.set(EXPRESS_BASED_APPLICATION_KEY, Application_1.ApplicationFactory.ExpressApplication());
var bootoptions;
var app;
exports.State = {
    Ready: false
};
/**
 * The BootStrap function will create the server listener instance but not attach
 * it to the http listen yet. All directories are parsed for controllers and services at this point.
 */
function BootStrap(options) {
    return application.BootStrap(options);
}
exports.BootStrap = BootStrap;
/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
exports.App = function () {
    return application.server.App;
};
var server;
/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
function Listen() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var port;
    var callback;
    port = args[0], callback = args[1];
    OnReady(function () {
        exports.App().get("/can-i/document", function (req, res, next) {
            process.nextTick(function () {
                console.log(Config_1.configurationManager.feature.enabled("documentation"));
                if (Config_1.configurationManager.feature.enabled('documentation')) {
                    res.send(res.locals);
                }
                else {
                    next();
                }
            });
        });
    });
    return application.Listen(port, callback);
}
exports.Listen = Listen;
/**
 * Use to make sure the application is in a safe state after bootstrap is called
 */
function OnReady() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (cb) {
        application.onReady(cb);
    });
}
exports.OnReady = OnReady;
/**
 * Gracefully shutdown the server.
 *
 */
function Close() {
    application.Close();
}
exports.Close = Close;
/**
 * Gets the instance of the server that is running
 */
function GetServer() {
    return application.server_instance;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map