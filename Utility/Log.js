"use strict";
var bunyan = require("bunyan");
var os = require("os");
var Path = require("path");
var limberjack_1 = require("limberjack");
exports.AppLog = new limberjack_1.default("Application", {
    file: ".can-i/log.log",
    tags: ["app"]
});
var StartLog = exports.AppLog.extend("Start", {
    tags: ["start"]
});
StartLog.info("*************START*************");
exports.RouteLog = exports.AppLog.extend("route");
var mkdir = require('mkdirp');
function get_path(logtype) {
    if (logtype === void 0) { logtype = ''; }
    var _os = os.platform();
    var dashlog = logtype ? logtype + "-" : '';
    var filename = dashlog + "log.txt";
    var path = (function () {
        switch (_os) {
            case 'win32':
                return process.env.AppData + "\\Logs\\CanI\\" + filename;
            default:
                return filename;
        }
    })();
    var base = Path.basename(path);
    var dir = Path.dirname(path);
    mkdir.sync(dir);
    return path;
}
var trace_level = 10;
var debug_level = 20;
var info_level = 30;
var warn_level = 40;
var error_level = 50;
var fatal_level = 60;
var streams = [
    {
        level: trace_level,
        path: get_path('trace')
    },
    {
        level: debug_level,
        path: get_path("debug")
    },
    {
        level: info_level,
        path: get_path("info")
    },
    {
        level: warn_level,
        path: get_path("warn")
    },
    {
        level: error_level,
        path: get_path("error")
    },
    {
        level: fatal_level,
        path: get_path("fatal")
    }
];
var trace = streams.slice(0, 1);
var debug = streams.slice(0, 2);
var info = streams.slice(0, 3);
var warn = streams.slice(0, 4);
var error = streams.slice(0, 5);
var fatal = streams.slice(0);
var application = bunyan.createLogger({
    name: "Application",
    streams: info
});
function Application() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    application.info.apply(application, args);
}
var job = bunyan.createLogger({
    name: "Application:Job",
    streams: info
});
function Job() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    job.info.apply(job, args);
}
var app_err = bunyan.createLogger({
    name: "Application:Error",
    streams: error
});
function AppError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    app_err.error.apply(app_err, args);
}
var main = bunyan.createLogger({
    name: "Application:Main",
    streams: info
});
function Main() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    main.info.apply(main, args);
}
exports.Logger = {
    Application: Application,
    Job: Job,
    AppError: AppError,
    Main: Main
};
//# sourceMappingURL=Log.js.map