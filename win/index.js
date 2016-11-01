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
function Accessor(obj) {
    let o = obj;
    let access = o.__can_u_leave_me_alone = o.__can_u_leave_me_alone || {};
    return access;
}
exports.Accessor = Accessor;
//# sourceMappingURL=index.js.map