"use strict";
exports.Express = require("express");
exports.app = exports.Express();
let server;
function Features() {
    return ["documentation"];
}
exports.Features = Features;
function Configure(options = {}) {
    let features = options.features || [];
    for (let f of features) {
        exports.ConfigurationManager.feature.enable(f);
    }
}
exports.Configure = Configure;
class Feature {
    constructor(app) {
        this.app = app;
    }
    convert(f) {
        return `can-i feature ${f}`;
    }
    enable(f) {
        return this.app.enable(this.convert(f));
    }
    enabled(f) {
        return this.app.enabled(this.convert(f));
    }
    disable(f) {
        return this.app.disable(this.convert(f));
    }
    disabled(f) {
        return this.app.disabled(this.convert(f));
    }
}
class _ConfigurationManager {
    constructor(app) {
        this.app = app;
        this.feature = new Feature(this.app);
    }
}
exports.ConfigurationManager = new _ConfigurationManager(exports.app);
function Listen(...args) {
    exports.app.get("/can-i/document", function (req, res, next) {
        process.nextTick(() => {
            if (exports.ConfigurationManager.feature.enabled('documentation'))
                res.send(res.locals);
            else {
                next();
            }
        });
    });
    server = exports.app.listen.apply(exports.app, args);
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
let map = new Map();
exports.Accessor = function (obj) {
    let o = obj.constructor === Function ? obj : obj.constructor;
    let r = map.get(o.name);
    if (!r) {
        r = {};
        map.set(o.name, r);
    }
    return r;
};
//# sourceMappingURL=index.js.map