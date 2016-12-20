const bunyan = require("bunyan");
import * as os from "os";
import * as fs from 'fs';
import * as Path from "path";
import LimberJack from 'limberjack';

export const AppLog = new LimberJack("Application",{
    file:".can-i/log.log",
    tags:["app"]
})


const StartLog = AppLog.extend("Start",{
    tags:["start"]
});


StartLog.info("*************START*************");


export const RouteLog = AppLog.extend("route");







const mkdir = require('mkdirp');

function get_path(logtype: string = '') {
    let _os = os.platform();
    let dashlog = logtype ? `${logtype}-` : '';
    let filename = `${dashlog}log.txt`;



    let path = (function () {
        switch (_os) {
            case 'win32':
                return `${process.env.AppData}\\Logs\\CanI\\${filename}`;
            default:
                return filename
        }
    })()

    let base = Path.basename(path);
    let dir = Path.dirname(path);

    mkdir.sync(dir);


    return path;

}

let trace_level = 10;
let debug_level = 20;
let info_level = 30;
let warn_level = 40;
let error_level = 50;
let fatal_level = 60;


let streams = [
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
]

let trace = streams.slice(0, 1);
let debug = streams.slice(0, 2);
let info = streams.slice(0, 3);
let warn = streams.slice(0, 4);
let error = streams.slice(0, 5);
let fatal = streams.slice(0);

let application = bunyan.createLogger({
    name: "Application",
    streams: info
});

function Application(...args: any[]) {
    application.info(...args);
}

let job =  bunyan.createLogger({
    name:"Application:Job",
    streams:info
})

function Job(...args:any[]){
    job.info(...args);
}


let app_err = bunyan.createLogger({
    name:"Application:Error",
    streams:error
})

function AppError(...args:any[]){
    app_err.error(...args);
}

let main = bunyan.createLogger({
    name:"Application:Main",
    streams:info
})

function Main(...args:any[]){
    main.info(...args)
}


export const Logger = {
    Application,
    Job,
    AppError,
    Main
}
