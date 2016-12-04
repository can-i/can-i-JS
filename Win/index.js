"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Event_1 = require("./../Event");
var Config_1 = require("./../Config");
var consolidate = require("consolidate");
var Boot_1 = require("../Work/Boot");
require("reflect-metadata");
exports.Express = require("express");
__export(require("./Accessor"));
var _ = require("lodash");
var glob = require("glob");
var Path = require("path");
var Log_1 = require("../Utility/Log");
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
    //Guard against multiple Boot
    if (app) {
        Log_1.Logger.AppError("Attempted boot multiple times");
        return app;
    }
    Log_1.Logger.Main("Calling BootStrap");
    Log_1.Logger.Main("Options\n" + JSON.stringify(options));
    app = exports.Express();
    var on_ready = function () {
        Log_1.Logger.Main("Application created");
        if (options === null) {
            Log_1.Logger.Main("Options are null\nNo Configuration used");
            console.warn("No BootStrapping config.\nThe only excuse is Unit Testing!!");
        }
        options = options || {};
        //Good Defaults
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
        Log_1.Logger.Main("Created default configuration");
        if (options !== null) {
            options = _.defaultsDeep(options, defaults);
            glob.sync(options.controllers + "/**/*.js").filter(function (x) { return /.js$/.test(x); }).map(function (x) {
                Log_1.Logger.Main("Loading Controller " + x);
                return x;
            }).map(require);
            glob.sync(options.services + "/**/*.js").filter(function (x) { return /.js$/.test(x); }).map(function (x) {
                Log_1.Logger.Main("Loading Service " + x);
                return x;
            }).map(require);
            var e = options.engine;
            app.set('views', options.views);
            app.set('view engine', e.extension);
            app.engine(e.extension, consolidate[e.engineName]);
        }
        exports.State.Ready = true;
        Log_1.Logger.Main("Application Ready");
    };
    OnReady(on_ready);
    Event_1.Event.emit("can-i:bootstrapped");
    return app;
}
exports.BootStrap = BootStrap;
/**
 * Get the Express.Application if it has been created. Otherwise it throws an error
 */
exports.App = function () {
    if (!app) {
        var msg = "Fatal Error. Attempted to Access Application before creation";
        var error = new Error(msg);
        Log_1.Logger.AppError(error.stack);
        throw error;
    }
    Log_1.Logger.Main("Retrieving Express App");
    return app;
};
var server;
/**
 * Attaches the listener to the Server.
 * Clients can now start making request to the server.
 */
function Listen() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    Log_1.Logger.Main("Attaching Listener to http server");
    var app = exports.App();
    Log_1.Logger.Main("Attaching Documentation");
    app.get("/can-i/document", function (req, res, next) {
        process.nextTick(function () {
            if (Config_1.configurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    });
    server = app.listen.apply(app, args);
    Log_1.Logger.Main("Starting Job Engine");
    Boot_1.Boot();
}
exports.Listen = Listen;
/**
 * Use to make sure the application is in a safe state after bootstrap is called
 */
function OnReady() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    args.forEach(function (callback) {
        if (exports.State.Ready) {
            callback();
        }
        else {
            Event_1.Event.on("can-i:bootstrapped", callback);
        }
    });
}
exports.OnReady = OnReady;
/**
 * Gracefully shutdown the server.
 *
 */
function Close() {
    GetServer().close();
    return this;
}
exports.Close = Close;
/**
 * Gets the instance of the server that is running
 */
function GetServer() {
    return server;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map