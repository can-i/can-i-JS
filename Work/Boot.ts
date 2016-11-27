import { configurationManager } from './../Config/index';
import { Controller } from './../Controller/index';
import { Accessor } from './../win/Accessor';
import { ControllerJobs, JobSettings, JobOption } from './index';
import { ServiceBuilder } from '../IOC/ServiceBuilder';
import { Logger } from '../Utility/Log';

const cron = require("node-cron");
const {CronJob} = require("cron");
let queue: any[] = [];

let run = false;

function Next() {
    if (!run) {
        Logger.Job("Job paused, skipping job");
        return;
    }
    let task = queue.shift();
    if (task) {
        Logger.Job({ 'Job Count': queue.length }, `Performing next job`)
        setTimeout(task);
    }
}



export function Boot() {
    Logger.Job("Booting jobs");

    for (let job_target of ControllerJobs) {
        ((job_target) => {


            //Ensure correct job_target start

            /**
             * All jobs that are needed for the Controller
             * This is important because a controller can have many jobs
             * and they all need to be in the queue.
             * The problem i am trying to avoid is all the jobs running at the same time
             * This could overload the database or do some silly query so i need to ensure
             * that the user is protected from that.
             */
            let access = Accessor(job_target);
            let jobs = access.job;



            function loop_function(job: JobSettings, index: number) {
                //Task
                let options = job.options;
                let method = (<any>job_target)[job.method_name];


                setTimeout(function () {

                    var next = function () {

                        setTimeout(function () {
                            Push(function () {
                                loop_function(job, index);
                            });
                        }, 0)

                        Next()
                    }


                    let args = ServiceBuilder.getServiceMethodNeeds(job_target, job.method_name);
                    args.pop();
                    args.push(next);


                    method.apply(job_target, args);

                }, options.ever || 60 * 60 * 1000 / 3) //20 mins


            }



            function cronjob_loop(job: JobSettings, index: number) {

                try {
                    Logger.Job(job.options, `Cron Job settings`);
                    let first = false;

                    let Schedule = function () {
                        Logger.Job({ index }, "Pushing Cronjob onto the stack");
                        //Need to build the service

                        let target = job.target;
                        let method = (<any>job.target)[job.method_name];

                        let args = ServiceBuilder.getServiceMethodNeeds(target, job.method_name);

                        let i = args.lastIndexOf(null);
                        args[i] = Next;

                        Logger.Job({ job: job.method_name }, "Adding Job")

                        //main goal push function into array
                        Push(function () {
                            Logger.Job({ job: job.method_name }, "Performing job")
                            method.apply(target, args);
                        })
                    }

                    let _job = cron.schedule(job.options.cron, Schedule);
                    // let _job = new CronJob(job.options.cron,Schedule);
                    // _job.start();
                    Logger.Job("Job started");

                } catch (e) {
                    let _e: Error = <Error>e;
                    Logger.AppError(_e.message);
                    Logger.AppError(_e.stack);
                }
            }

            let index = 0
            for (let job of jobs) {
                //careful with javascript

                ((job, index) => {
                    // loop_function(job,index)

                    //initial push into queue
                    if (job.options.cron) {
                        cronjob_loop(job, index);
                    } else {
                        Push(function () {
                            loop_function(job, index);
                        });
                    }

                })(job, index)
                index++;
            }

            //Ensure correct job_target start
        })(job_target)
    }
    Run();
}


function Push(...args: any[]) {
    queue.push(...args);
    Logger.Job({'Queue Size':queue.length},"Added to Job Stack");
    if (queue.length === 1) {
        // setTimeout(Next);
        Next();
    }

}


export function Run() {
    run = true;
    Next();
}


export function Stop() {
    run = false;
}


export default Boot;

