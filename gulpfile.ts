import { CallBack } from 'promise-lib';
import * as fs from 'fs';
import * as child_process from "child_process";


import * as gulp from "gulp";
import * as path from 'path';
let concat = require("gulp-concat");






gulp.task("tsc:glob",["Namespace Grouping"], async function () {
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

gulp.task("tsc",["tsc:glob"], async function () {

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


gulp.task("Namespace Grouping",["Group Settings","Group Decorators"]);



gulp.task("default", ["tsc","Namespace Grouping"])