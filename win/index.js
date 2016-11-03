"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const index_1 = require('./../Config/index');
const consolidate = require("consolidate");
require("reflect-metadata");
exports.Express = require("express");
__export(require("./Accessor"));
const _ = require("lodash");
const glob = require("glob");
const Path = require("path");
function BootStrap(options) {
    app = exports.Express();
    if (options === null) {
        console.warn(`No BootStrapping config.\nThe only excuse is Unit Testing!!`);
    }
    options = options || {};
    let defaults = {
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
    glob.sync(options.controllers).map(require);
    glob.sync(`${options.services}/**/*`).map(require);
    let e = options.engine;
    app.set('views', options.views);
    app.set('view engine', e.extension);
    app.engine(e.extension, consolidate[e.engineName]);
    return app;
}
exports.BootStrap = BootStrap;
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
            if (index_1.configurationManager.feature.enabled('documentation'))
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
    return server.close();
}
exports.Close = Close;
function GetServer() {
    return server;
}
exports.GetServer = GetServer;
//# sourceMappingURL=index.js.map