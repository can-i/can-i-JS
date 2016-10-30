"use strict";
exports.Express = require("express");
exports.app = exports.Express();
let server;
function Listen(...args) {
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
//# sourceMappingURL=index.js.map