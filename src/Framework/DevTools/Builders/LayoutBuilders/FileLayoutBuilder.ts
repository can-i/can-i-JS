import LayoutBuilder from './LayoutBuilder';
import NameDataStructure from '../../../Core/Components/Structure/NameDataStructure';

import * as mkdirp from "mkdirp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { CallBack } from "promise-lib";


export function Creator(root_directory: string, settings: any) {
    //might do some extra things
    return new FileLayoutBuilder(root_directory, settings);
}

export class FileLayoutBuilder extends LayoutBuilder {

    constructor(root_directory: string, settings: any) {
        super(root_directory, settings);
    }



    async onItemAction (item:NameDataStructure){
            if (typeof item === "boolean") {
                //Create file
                this.CreateFile(this.root_directory, this.settings);
            } else {
                //skip
            }
    }

    /**
     * This creates the needed folder from the layout settings
     */
    async CreateFile(root: string, name: string) {
        let filepath = this.CreateFilePath(root, name);
        let [err, stats]: [Error, fs.Stats] = await CallBack.Call(fs.stat, filepath);
        if (err) {
            //File doesn't exist and needs to be created;
            // Minicking
            // fs.writeFile(filepath,"","w");
            let [err]: [Error] = await CallBack.Call(fs.writeFile, filepath,"","w");
            if (err) {
                //problem writing the file
                throw err;
            }
        } else {
            if (stats.isDirectory()) {
                //log the problem and potential error
                //TODO this can be dealth with later
                /*


                    It's a directory i need to somehow figure out the 
                    problem and the resolution here.

                    If i find a directory where there should have been a file
                    What exactly should i do?

                */


            } else if (stats.isFile()) {
                //Log info here
                //This is ok it's a file and it already exist
            } else {
                //Log warning here
                //Something else entirely. This will have to be dealth with
            }
        }
    }



    CreateFilePath(root: string, name: string) {
        let namepath = name.replace(/\./g, path.sep);
        return path.join(root, namepath);
    }





}


export default FileLayoutBuilder;