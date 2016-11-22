import { configurationManager } from './../Config/index';
import { Controller } from './../Controller/index';
import { Accessor } from './../win/Accessor';
import { ControllerJobs, JobSettings } from './index';

let queue: any[] = [];

let run = false;


function Next() {
    if (!run) {
        return;
    }
    let task = queue.shift();
    if (task) {
        task();
    }
}

export function Boot() {

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

                    method.call(job_target, function () {

                        console.log("second push")
                        setTimeout(function () {
                            Push(function () {
                                loop_function(job, index);
                            });
                        },0)

                        Next()
                    });

                }, options.ever || 60 * 60 * 1000 / 3) //20 mins


            }

            let index = 0
            for (let job of jobs) {
                //careful with javascript
                ((job, index) => {

                    // loop_function(job,index)

                    //initial push into queue
                    console.log("original push")
                    Push(function () {
                        loop_function(job, index);
                    });

                })(job, index)
                index++;
            }






            //Ensure correct job_target start
        })(job_target)
    }
    Run();
}



function Push(...args: any[]) {
    console.log("pushing")
    queue.push(...args);
    if (queue.length === 1) {
        setTimeout(Next);
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

