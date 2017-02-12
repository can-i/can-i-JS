import * as path from 'path';
import FileExistQuery from '../Utilities/File/Queries/FileExistQuery';
import { FileExistQuerySync } from '../Utilities/File/Queries/FileExistQuery';
import { PreviousSync } from "../Utilities/FileSystem/Navigation/Previous";
import Previous from "../Utilities/FileSystem/Navigation/Previous";
import { MainLogger } from '../Log/MainLogger';


let log = MainLogger.extend("PackageJsonGetter", {
    tags: ["PackageJsonGetter"]
})



export async function PackageJsonGetter(directory: string = process.cwd()) {

    log.info(`Searching for 'package.json' file async in directory "${directory}`);

    let last: string;
    let pkg: string = path.resolve(directory, "package.json");
    let prev_directory: string = "#";



    while (directory !== prev_directory) {





        if (prev_directory !== "#") {
            log.debug(`directory: "${prev_directory}" is not equal to "${directory}"`);
            log.info(`Previously Searched ${prev_directory}`)
        }




        log.info(`Searching Directory: "${directory}" for 'package.json' `);






        pkg = path.resolve(directory, "package.json");






        /**
         * 
         * 
         * Trigger a warning if the code takes too long to run. It should not take more
         * that 5s to run this query
         * 
         * 
         */



        let waitTime_ms = 5000;


        let timeout = setTimeout(() => {
            log.warn(`PackageJsonGetting is taking a long time to Check if a file exist`)
        }, waitTime_ms);


        log.info(`Checking if file exist '${pkg}'`)
        let file_exist = await FileExistQuery(pkg);

        //if it doesn't run everthing is good
        clearTimeout(timeout);






        if (file_exist) {
            log.info(`file "${pkg}" exist`);
            if (file_exist.isFile()) {
                log.info(`Found 'package.json' at ${pkg}`);
                return pkg;
            } else {
                log.warn(`'package.json' is a Folder at ${pkg}`)
                throw new Error("'package.json' is Directory")
            }
        } else {
            //need to keep looking up;


            prev_directory = directory;
            

            let waitTime = 5000;
            let timeout = setTimeout(function(){
                log.warn("Taking an abnormal amount of time to get Previous Direcory");
            },waitTime);
            

            directory = await Previous(directory);
            clearTimeout(timeout);

            log.info("End of while loop")

        }



    }


    log.warn(`Searching for package.json reached top of files system ${directory}`);

    const msg = "No Package.json available";
    log.warn(msg);
    throw new Error(msg);
}



export function PackageJsonGetterSync(directory: string = process.cwd()) {

    log.info("Searching for 'package.json' file sync");

    let last: string;
    let pkg: string = path.resolve(directory, "package.json");
    let prev_directory: string = "#";
    while (directory !== prev_directory) {

        prev_directory = directory;
        pkg = path.resolve(directory, "package.json");
        let file_exist = FileExistQuerySync(pkg);
        if (file_exist) {

            if (file_exist.isFile()) {
                log.info(`Found 'package.json' at ${pkg}`);
                return pkg;
            } else {
                log.warn(`'package.json' is a Folder at ${pkg}`)
                throw new Error("Package.json is Directory")
            }
        } else {
            //need to keep looking up;
            prev_directory= directory;

            directory = PreviousSync(directory);
        }
    }




    //Fail to find on File System
    const msg = "No 'package.json' available";
    log.warn(msg);
    throw new Error(msg);



}





export default PackageJsonGetter;