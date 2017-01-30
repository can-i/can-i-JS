import {CallBack} from 'promise-lib';
import * as fs from 'fs';
import { MainLogger } from '../../../Log/MainLogger';


const log = MainLogger.extend("FileExistQuery",{
    tags:["query"]
});

export async function FileExistQuery(filepath:string){
    let [err,stat]:[Error,fs.Stats] = await CallBack.Call(fs.stat,filepath);
    if(err){
        log.warn(err.message);
        log.warn(err.stack?err.stack:"");      
        return false;
    }else{
        return stat;
    }
}


export function FileExistQuerySync(filepath:string){
    try{
        return fs.statSync(filepath);
    }catch(e){
        return false;
    }
}


export default FileExistQuery;
