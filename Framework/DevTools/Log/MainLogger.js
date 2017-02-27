"use strict";
var limberjack_1 = require("limberjack");
var limberjack_2 = require("limberjack");
var os = require("os");
var path = require("path");
var tempdir = os.tmpdir();
var loggerpath = path.join(tempdir, "can-i.log");
exports.MainLogger = limberjack_1.default("can-i", {
    file: loggerpath,
    level: limberjack_2.LOGLEVEL.DEBUG,
    tags: ["main"]
});
exports.StartLogger = exports.MainLogger.extend("start", {
    tags: ["start"]
});
console.log("File Log Location: " + loggerpath);
exports.StartLogger.info("********************* Start ************************");
//# sourceMappingURL=MainLogger.js.map