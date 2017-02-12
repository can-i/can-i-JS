import LimberJack from "limberjack";
import {LOGLEVEL,ILimberJack} from "limberjack";


import * as os from "os";
import * as path from 'path';

let tempdir = os.tmpdir();

let loggerpath =  path.join(tempdir,"can-i.log");




export const MainLogger = LimberJack("can-i",{
    file:loggerpath,
    level:LOGLEVEL.DEBUG,
    tags:["main"]
})


export const StartLogger = MainLogger.extend("start",{
    tags:["start"]
})

console.log(`File Log Location: ${loggerpath}`);

StartLogger.info("********************* Start ************************");

