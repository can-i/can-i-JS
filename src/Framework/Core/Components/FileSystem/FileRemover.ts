import NodeRemover from '../../../Contracts/FileSystem/Nodes/NodeRemover';
import { CallBack } from 'promise-lib';
import * as fs from 'fs';



export class FileRemover extends NodeRemover{

    async delete(_path:string){
        await CallBack.Call(fs.unlink,_path);
    }
}