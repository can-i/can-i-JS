import LayoutBuilder from './LayoutBuilder';
import NameDataStructure from '../../../Core/Components/Structure/NameDataStructure';

import * as mkdirp from "mkdirp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { CallBack } from "promise-lib";
import { MainLogger } from '../../Log/MainLogger';

const log = MainLogger.extend("FolderLayoutBuilder",{
    tags:["folderLayoutBuilder"]
})


export function Creator(root_directory: string, settings: any) {

    log.info(`Factory creating "${FolderLayoutBuilder.name}"`)
    
    
    //might do some extra things
    return new FolderLayoutBuilder(root_directory, settings);
}

export class FolderLayoutBuilder extends LayoutBuilder {

    constructor(root_directory: string, settings: any) {
        super(root_directory, settings);
    }


    async onItemAction(item: NameDataStructure) {
        if (typeof item === "object") {
            
            this.CreateFolder(this.root_directory, this.settings);
            //Create folder
        } else {
            //skip
        }
    }

    /**
     * This creates the needed folder from the layout settings
     */
    async CreateFolder(root: string, name: string) {
        let folderpath = this.CreateFolderPath(root, name);
        let [err, stats]: [Error, fs.Stats] = await CallBack.Call(fs.stat, folderpath);
        if (err) {
            //Folder doesn't exist and needs to be created;
            let [err]: [Error] = await CallBack.Call(mkdirp, folderpath);
            if (err) {
                throw err;
            }
        } else {
            if (stats.isFile()) {
                //log the problem and potential error
                //TODO this can be dealth with later
                /*
                    It's a file i need to copy into memory and then make the file.

                */


            } else if (stats.isDirectory()) {
                //Log info here
                //This is ok it's a directory and it already exist
            } else {
                //Log warning here
                //Something else entirely. This will have to be dealth with
            }
        }
    }



    CreateFolderPath(root: string, name: string) {
        let namepath = name.replace(/\./g, path.sep);
        return path.join(root, namepath);
    }





}


export default FolderLayoutBuilder;