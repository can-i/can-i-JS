"use strict";
var Accessor_1 = require("./../win/Accessor");
var index_1 = require("./index");
var ServiceBuilder_1 = require("../IOC/ServiceBuilder");
var queue = [];
var run = false;
ServiceBuilder_1.ServiceBuilder;
function Next() {
    if (!run) {
        return;
    }
    var task = queue.shift();
    if (task) {
        task();
    }
}
function Boot() {
    for (var _i = 0, ControllerJobs_1 = index_1.ControllerJobs; _i < ControllerJobs_1.length; _i++) {
        var job_target = ControllerJobs_1[_i];
        (function (job_target) {
            var access = Accessor_1.Accessor(job_target);
            var jobs = access.job;
            function loop_function(job, index) {
                var options = job.options;
                var method = job_target[job.method_name];
                setTimeout(function () {
                    var next = function () {
                        setTimeout(function () {
                            Push(function () {
                                loop_function(job, index);
                            });
                        }, 0);
                        Next();
                    };
                    var args = ServiceBuilder_1.ServiceBuilder.getServiceMethodNeeds(job_target, job.method_name);
                    args.pop();
                    args.push(next);
                    method.apply(job_target, args);
                }, options.ever || 60 * 60 * 1000 / 3);
            }
            var index = 0;
            for (var _i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
                var job = jobs_1[_i];
                (function (job, index) {
                    Push(function () {
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
function Push() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    queue.push.apply(queue, args);
    if (queue.length === 1) {
        setTimeout(Next);
    }
}
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