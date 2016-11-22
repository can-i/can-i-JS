"use strict";
var index_1 = require("./../Config/index");
var Accessor_1 = require("./../win/Accessor");
var index_2 = require("./index");
var queue = [];
var run = false;
function Next() {
    if (!run) {
        return;
    }
    var task = queue.shift();
    if (task) {
        task();
    }
    else {
        setTimeout(Next, index_1.configurationManager.feature.get("jobTickRate", 5000));
    }
}
function Boot() {
    console.log(index_2.ControllerJobs.length);
    for (var _i = 0, ControllerJobs_1 = index_2.ControllerJobs; _i < ControllerJobs_1.length; _i++) {
        var job_target = ControllerJobs_1[_i];
        (function (job_target) {
            var access = Accessor_1.Accessor(job_target);
            var jobs = access.job;
            function loop_function(job, index) {
                console.log("times", index);
                console.log(job.options);
                var options = job.options;
                var method = job_target[job.method_name];
                setTimeout(function () {
                    method.call(job_target, function () {
                        queue.push(function () {
                            loop_function(job, index);
                        });
                        Next();
                    });
                }, options.ever || 60 * 60 * 1000 / 3);
            }
            var index = 0;
            for (var _i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
                var job = jobs_1[_i];
                (function (job, index) {
                    queue.push(function () {
                        loop_function(job, index);
                    });
                })(job, index);
                index++;
            }
        })(job_target);
    }
    Run();
}
exports.Boot = Boot;
function Run() {
    run = true;
    Next();
}
exports.Run = Run;
function Stop() {
    run = false;
}
exports.Stop = Stop;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Boot;
//# sourceMappingURL=Boot.js.map