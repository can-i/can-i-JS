import * as path from 'path';
import { CallBack } from 'promise-lib';
import * as fs from 'fs';



export async function Previous(folder_or_file_path: string) {
    let [err, stats]: [Error, fs.Stats] = await CallBack.Call(fs.stat, folder_or_file_path);


    if (err) {
        throw err;
    } else {
        if (stats.isFile()) {
            return path.dirname(folder_or_file_path);
        } else if (stats.isDirectory()) {
            return path.resolve(folder_or_file_path, "..");
        } else {
            throw new Error("Unknown file type to handle previous. Not sure how to navigate");
        }
    }
}


export function PreviousSync(folder_or_file_path: string) {

    let stats = fs.statSync(folder_or_file_path);
    
    if (stats.isFile()) {
        return path.dirname(folder_or_file_path);
    } else if (stats.isDirectory()) {
        return path.resolve(folder_or_file_path, "..");
    } else {
        throw new Error("Unknown file type to handle previous. Not sure how to navigate");
    }
}


export default Previous;