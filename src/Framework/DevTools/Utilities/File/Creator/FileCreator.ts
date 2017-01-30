import IsFilePathQuery from '../Queries/IsFilePathQuery';
import {CallBack} from 'promise-lib';
import * as fs from 'fs';



export async function FileCreator(filepath:string){
    if(IsFilePathQuery(filepath)){

        //Open or truncate file
        let [err,fd] = await CallBack.Call(fs.open,filepath,"w");
        if(err) throw new Error("Error Opening File");



        //Close the file        
        let [err2] = await CallBack.Call(fs.close,fd);
        if(err2) throw new Error("Error Closing File");
    }else{
        throw new Error("Not a File");
    }
}