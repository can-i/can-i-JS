import Builder from '../../../Contracts/Builders/Builder';
import { CallBack, PArray } from 'promise-lib';
import * as fs from 'fs';
import * as path from 'path';
export class IndexBuilder extends Builder {
    constructor(private _path: string) {
        super();
    }

    async build() {

        //REad the directory
        let [err, files]: [Error, string[]] = await CallBack.Call(fs.readdir, this._path)
        if (err) throw err;

        //Map them to the full filename
        const full_dirs = files.map(file => {
            return path.join(this._path, file)
        })

        //Convert to async
        let p = new PArray(full_dirs);


        //Get the Stats
        let p_stats = await p.map(async item => {
            let [err, stat] = await CallBack.Call(fs.stat, item);
            if (err) throw err;
            return stat as fs.Stats;
        })


        let imports_and_export: string[][] = [];

        for (let len = files.length, ii = 0; ii < len; ii++) {
            let filename = files[ii];
            let full_path = full_dirs[ii];
            let stat = p_stats.data[ii];


            // //If this is a definition file i want to ignore it
            // if(/d\.ts/.test(full_path))continue;

            // //If it's a file and it's not a ts file i want to ignore it
            // if(stat.isFile() &&  !/\.ts/.test(full_path)  )continue;

            // let i_and_c = this.buildIndexFile(filename,full_path,stat);

            // imports_and_export.push(i_and_c);


            let i_and_c: undefined | string[];

            if (stat.isDirectory()) {
                i_and_c = await this.onFolder(filename, full_path, stat);
            } else if (!/d\.ts$/.test(filename) && /\.ts/.test(filename) && !/index\.ts/.test(filename)) {
                i_and_c = await this.onFile(filename, full_path, stat);
            }

            if (typeof i_and_c !== "undefined")
                imports_and_export.push(i_and_c);
        }

        try {
            let file_parts = imports_and_export.reduce((ic_str: string[], iandc) => {
                let [i, c] = ic_str;
                let [_i, _c] = iandc;

                i += _i;
                if (c) {
                    c += ",\n"
                }
                c += _c

                return [i, c];
            })


            file_parts[1] = `export default {${file_parts[1]}};`
            let text = file_parts.join("\n");

            fs.writeFile(path.resolve(this._path, "index.ts"), text, function (err) {
                if (err) throw err;
            })
        } catch (e) {

        }

        // return file_parts;
    }


    buildIndexFile(filename: string, full_path: string, stat: fs.Stats) {
        filename = stat.isDirectory() ? filename : filename.replace(/\.ts$/, "");
        let imports = `
            import * as ${filename} from './${filename}'
        `;

        let _class = `${filename}`;


        return [imports, _class];
    }

    async onFolder(filename: string, fullpath: string, stat: fs.Stats) {
        let ib = new IndexBuilder(fullpath);
        ib.build();

        return this.buildIndexFile(filename, fullpath, stat);
    }

    async onFile(filename: string, fullpath: string, stat: fs.Stats) {
        return this.buildIndexFile(filename, fullpath, stat);
    }



}