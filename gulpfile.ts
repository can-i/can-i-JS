import { CallBack } from 'promise-lib';
import * as fs from 'fs';
import * as child_process from "child_process";


import * as gulp from "gulp";
import * as path from 'path';
let concat = require("gulp-concat");
import * as pump from "pump";

import * as rs from "run-sequence";



async function RunProcess(program: string, args: string[] = []) {
    
    let {spawn} = child_process;

    let child = spawn(program, args, {
        stdio: "inherit"
    });

    let on = child.on.bind(child);


    let onExit = CallBack.Call(on, "exit");

    let onError = CallBack.Call(on, "error");


    let [result]: [Error | number] = await Promise.race([onExit, onError]);

    if (typeof result === "number") {
        if (result !== 0) {
            throw new Error(`program exited with error code ${result}`);
        }
    } else {
        throw result;
    }
}





/**
 * Script Program
 */


gulp.task("folder_file_builder", async function () {
    console.log();
    try {
        await RunProcess("node", ["./scripts/folder_file_builder.script.js"])
    } catch (e) {
        console.error(e.stack);
        throw e;
    }

})


gulp.task("print_main_log", async function () {
    console.log();
    try {
        await RunProcess("cmd", [`/c`,`lj`,`-l`,"debug",`${path.resolve(process.env.TMP,"can-i.log")}`])
    } catch (e) {
        console.error(e.stack);
        throw e;
    }

})


gulp.task("delete_log",async function(){
    await RunProcess("cmd",["/c","del",`${path.resolve(process.env.TMP,"can-i.log")}`])
})


gulp.task("folder_file_build_and_logs", function () {
    return rs("folder_file_builder","print_main_log","delete_log")
})




























/**
 * 
 * Generate the Files that needs to be processed base on globs
 * 
 */


gulp.task("tsc:glob", ["Namespace Grouping"], async function () {
    let {spawn} = child_process;



    let child = spawn("node.exe", [path.join(__dirname, "./node_modules/ts-glob/bin/index")], {
        stdio: "inherit"
    })

    //on Event Emitter;
    const on = child.on.bind(child);


    let onError = CallBack.Call(on, "error");

    let onExit = CallBack.Call(on, "exit");

    let [result]: number[] | Error[] = await Promise.race([onError, onExit])

    if (typeof result === "number") {
        let msg = `Exit code: ${result}`;
        if (result === 0) {
            // console.log(msg);
            //everything is good
        } else {
            console.error(`Exit code: ${result}`);
            //error running task
            throw new Error("tsc had errors");
        }
    } else {
        throw result;
    }


})



















/**
 * Namespaced Files that need to get grouped
 */






gulp.task("Group Settings", function () {
    gulp.src("lib/Config/Settings/**/*.ts").
        pipe(concat({ path: "Settings.ts" })).
        pipe(gulp.dest("lib/Config"))
})

gulp.task("Group Decorators", function () {
    gulp.src("lib/Decorator/Decorators/**/*.ts").
        pipe(concat({ path: "index.ts" })).
        pipe(gulp.dest("lib/Decorator"))
})


gulp.task("Namespace Grouping", ["Group Settings", "Group Decorators"]);
















/**
 * Generating Typescript Project files
 */

gulp.task("tsc", ["tsc:glob"], async function () {

    let {spawn} = child_process;



    let child = spawn("node.exe", [path.join(__dirname, "node_modules/typescript/bin/tsc")], {
        stdio: "inherit"
    })

    //on Event Emitter;
    const on = child.on.bind(child);


    let onError = CallBack.Call(on, "error");

    let onExit = CallBack.Call(on, "exit");

    let [result]: number[] | Error[] = await Promise.race([onError, onExit])

    if (typeof result === "number") {
        let msg = `Exit code: ${result}`;
        if (result === 0) {
            // console.log(msg);
            //everything is good
        } else {
            console.error(`Exit code: ${result}`);
            //error running task
            throw new Error("tsc had errors");
        }
    } else {
        throw result;
    }

})















gulp.task("default", ["tsc", "Namespace Grouping"])