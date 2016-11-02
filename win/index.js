"use strict";
let map = new Map();
exports.Accessor = function (obj) {
    let o = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o);
    if (!r) {
        r = {};
        map.set(o, r);
    }
    return r;
};
exports.Express = require("express");
let app;
exports.App = function () {
    if (!app) {
        throw new Error("Application has not been bootstrapped");
    }
    return app;
};
let server;
function Listen(...args) {
    app.get("/can-i/document", function (req, res, next) {
        process.nextTick(() => {
            if (index_1.ConfigurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    });
    server = app.listen.apply(app, args);
}
exports.Listen = Listen;
function BootStrap(options) {
    app = exports.Express();
    if (options === null) {
        return console.warn(`No BootStrapping config.\nThe only excuse is Unit Testing!!`);
    }
    options = options || {};
    let defaults = {
        controllers: Path.join(process.cwd(), "controllers"),
        services: Path.join(process.cwd(), "services")
    };
    options = _.defaultsDeep(options, defaults);
    glob.sync(options.controllers).map(require);
    glob.sync(options.services).map(require);
}
exports.BootStrap = BootStrap;
const index_1 = require('./../Config/index');
const _ = require("lodash");
const glob = require("glob");
const Path = require("path");
function Close() {
    return server.close();
}
exports.Close = Close;
function GetServer() {
    return server;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map