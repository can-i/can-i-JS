/// <reference types="core-js" />
/// <reference types="node" />
import Builder from '../../../Contracts/Builders/Builder';
import * as fs from 'fs';
export declare class IndexBuilder extends Builder {
    private _path;
    constructor(_path: string);
    build(): Promise<void>;
    buildIndexFile(filename: string, full_path: string, stat: fs.Stats): string[];
    onFolder(filename: string, fullpath: string, stat: fs.Stats): Promise<string[]>;
    onFile(filename: string, fullpath: string, stat: fs.Stats): Promise<string[]>;
}
