"use strict";
var Accessor_1 = require("./../win/Accessor");
exports.ControllerJobs = [];
function Job(Options) {
    return function (target, str) {
        var access = Accessor_1.Accessor(target);
        access.job = access.job || [];
        access.job.push({
            target: target,
            method_name: str,
            options: Options
        });
        exports.ControllerJobs.push(target);
    };
}
exports.Job = Job;
//# sourceMappingURL=index.js.map