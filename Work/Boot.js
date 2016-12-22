"use strict";
var Accessor_1 = require("./../win/Accessor");
var index_1 = require("./index");
var ServiceBuilder_1 = require("../IOC/ServiceBuilder");
var Log_1 = require("../Utility/Log");
var cron = require("node-cron");
var CronJob = require("cron").CronJob;
var queue = [];
var cronqueue = [];
var run = false;
function Next() {
    if (!run) {
        Log_1.Logger.Job("Job paused, skipping job");
        return;
    }
    var task = queue.shift();
    if (task) {
        Log_1.Logger.Job({ 'Job Count': queue.length }, "Performing next job");
        setTimeout(task);
    }
}
function Boot() {
    Log_1.Logger.Job("Booting jobs");
    for (var _i = 0, ControllerJobs_1 = index_1.ControllerJobs; _i < ControllerJobs_1.length; _i++) {
        var job_target = ControllerJobs_1[_i];
        (function (job_target) {
            //Ensure correct job_target start
            /**
             * All jobs that are needed for the Controller
             * This is important because a controller can have many jobs
             * and they all need to be in the queue.
             * The problem i am trying to avoid is all the jobs running at the same time
             * This could overload the database or do some silly query so i need to ensure
             * that the user is protected from that.
             */
            var access = Accessor_1.Accessor(job_target);
            var jobs = access.job;
            function loop_function(job, index) {
                //Task
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
                }, options.ever || 60 * 60 * 1000 / 3); //20 mins
            }
            function cronjob_loop(job, index) {
                try {
                    Log_1.Logger.Job(job.options, "Cron Job settings");
                    var first = false;
                    var Schedule = function () {
                        Log_1.Logger.Job({ index: index }, "Pushing Cronjob onto the stack");
                        //Need to build the service
                        var target = job.target;
                        var method = job.target[job.method_name];
                        var args = ServiceBuilder_1.ServiceBuilder.getServiceMethodNeeds(target, job.method_name);
                        var i = args.lastIndexOf(null);
                        args[i] = Next;
                        Log_1.Logger.Job({ job: job.method_name }, "Adding Job");
                        //main goal push function into array
                        Push(function () {
                            Log_1.Logger.Job({ job: job.method_name }, "Performing job");
                            method.apply(target, args);
                        });
                    };
                    var _job = cron.schedule(job.options.cron, Schedule);
                    cronqueue.push(_job);
                    // let _job = new CronJob(job.options.cron,Schedule);
                    // _job.start();
                    Log_1.Logger.Job("Job started");
                }
                catch (e) {
                    var _e = e;
                    Log_1.Logger.AppError(_e.message);
                    Log_1.Logger.AppError(_e.stack);
                }
            }
            var index = 0;
            for (var _i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
                var job = jobs_1[_i];
                //careful with javascript
                (function (job, index) {
                    // loop_function(job,index)
                    //initial push into queue
                    if (job.options.cron) {
                        cronjob_loop(job, index);
                    }
                    else {
                        Push(function () {
                            loop_function(job, index);
                        });
                    }
                })(job, index);
                index++;
            }
            //Ensure correct job_target start
        })(job_target);
    }
    Run();
}
exports.Boot = Boot;
function Push() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    queue.push.apply(queue, args);
    Log_1.Logger.Job({ 'Queue Size': queue.length }, "Added to Job Stack");
    if (queue.length === 1) {
        // setTimeout(Next);
        Next();
    }
}
function Run() {
    run = true;
    Next();
}
exports.Run = Run;
function Stop() {
    run = false;
    cronqueue.forEach(function (c) { return c.stop(); });
}
exports.Stop = Stop;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Boot;
//# sourceMappingURL=Boot.js.map