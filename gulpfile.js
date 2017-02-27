"use strict";
var tslib_1 = require("tslib");
var promise_lib_1 = require("promise-lib");
var child_process = require("child_process");
var gulp = require("gulp");
var path = require("path");
var concat = require("gulp-concat");
var rs = require("run-sequence");
function RunProcess(program, args) {
    if (args === void 0) { args = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var spawn, child, on, onExit, onError, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spawn = child_process.spawn;
                    child = spawn(program, args, {
                        stdio: "inherit"
                    });
                    on = child.on.bind(child);
                    onExit = promise_lib_1.CallBack.Call(on, "exit");
                    onError = promise_lib_1.CallBack.Call(on, "error");
                    return [4 /*yield*/, Promise.race([onExit, onError])];
                case 1:
                    result = (_a.sent())[0];
                    if (typeof result === "number") {
                        if (result !== 0) {
                            throw new Error("program exited with error code " + result);
                        }
                    }
                    else {
                        throw result;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Script Program
 */
gulp.task("folder_file_builder", function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, RunProcess("node", ["./scripts/folder_file_builder.script.js"])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1.stack);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
});
gulp.task("print_main_log", function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, RunProcess("cmd", ["/c", "lj", "-l", "debug", "" + path.resolve(process.env.TMP, "can-i.log")])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.error(e_2.stack);
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
});
gulp.task("delete_log", function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RunProcess("cmd", ["/c", "del", "" + path.resolve(process.env.TMP, "can-i.log")])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
gulp.task("folder_file_build_and_logs", function () {
    return rs("folder_file_builder", "print_main_log", "delete_log");
});
/**
 *
 * Generate the Files that needs to be processed base on globs
 *
 */
gulp.task("tsc:glob", ["Namespace Grouping"], function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var spawn, child, on, onError, onExit, result, msg;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spawn = child_process.spawn;
                    child = spawn("node.exe", [path.join(__dirname, "./node_modules/ts-glob/bin/index")], {
                        stdio: "inherit"
                    });
                    on = child.on.bind(child);
                    onError = promise_lib_1.CallBack.Call(on, "error");
                    onExit = promise_lib_1.CallBack.Call(on, "exit");
                    return [4 /*yield*/, Promise.race([onError, onExit])];
                case 1:
                    result = (_a.sent())[0];
                    if (typeof result === "number") {
                        msg = "Exit code: " + result;
                        if (result === 0) {
                        }
                        else {
                            console.error("Exit code: " + result);
                            //error running task
                            throw new Error("tsc had errors");
                        }
                    }
                    else {
                        throw result;
                    }
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * Namespaced Files that need to get grouped
 */
gulp.task("Group Settings", function () {
    gulp.src("lib/Config/Settings/**/*.ts").
        pipe(concat({ path: "Settings.ts" })).
        pipe(gulp.dest("lib/Config"));
});
gulp.task("Group Decorators", function () {
    gulp.src("lib/Decorator/Decorators/**/*.ts").
        pipe(concat({ path: "index.ts" })).
        pipe(gulp.dest("lib/Decorator"));
});
gulp.task("Namespace Grouping", ["Group Settings", "Group Decorators"]);
/**
 * Generating Typescript Project files
 */
gulp.task("tsc", ["tsc:glob"], function () {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var spawn, child, on, onError, onExit, result, msg;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spawn = child_process.spawn;
                    child = spawn("node.exe", [path.join(__dirname, "node_modules/typescript/bin/tsc")], {
                        stdio: "inherit"
                    });
                    on = child.on.bind(child);
                    onError = promise_lib_1.CallBack.Call(on, "error");
                    onExit = promise_lib_1.CallBack.Call(on, "exit");
                    return [4 /*yield*/, Promise.race([onError, onExit])];
                case 1:
                    result = (_a.sent())[0];
                    if (typeof result === "number") {
                        msg = "Exit code: " + result;
                        if (result === 0) {
                        }
                        else {
                            console.error("Exit code: " + result);
                            //error running task
                            throw new Error("tsc had errors");
                        }
                    }
                    else {
                        throw result;
                    }
                    return [2 /*return*/];
            }
        });
    });
});
gulp.task("default", ["tsc", "Namespace Grouping"]);
//# sourceMappingURL=gulpfile.js.map