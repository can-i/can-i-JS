import "source-map-support/register";
import * as path from 'path';
import PackageJsonGetter from "../src/Framework/DevTools/Getters/PackageJsonGetter";
import * as fs from 'fs';
import { Creator as FileSystemBuilder } from '../src/Framework/DevTools/Builders/LayoutBuilders/FileSystemBuilder';

//Crash on Promise Error
import "../src/Framework/DevTools/Utilities/Promises/UnhandledRejectionCrasher";
 


async function Run(){

    let pkg = await PackageJsonGetter(__dirname);
    let root_path = path.dirname(pkg);

    let start = path.join(root_path,"src");
    let folderlayout = require("../src/Framework/Text/JSON/Folders/Layouts/DefaultLayout.json");

    let fsb = FileSystemBuilder(start,folderlayout);

    await fsb.FindItem(folderlayout);
}



Run();