import NodeCreator from '../../../Contracts/FileSystem/Nodes/NodeCreator';
import * as fs from 'fs';
import { CallBack } from 'promise-lib';


export class FileCreator extends NodeCreator{
    async create(_path:string){
        let [err,stats] = await CallBack.Call(fs.stat,_path);
        if(err){
            let [err] = await CallBack.Call(fs.writeFile,_path,"");
            if(err) {
                console.error(err.stack);
                throw err;
            }
        }
    }


    
}