import "source-map-support/register";
import { IndexBuilder } from '../Framework/DevTools/Builders/LayoutBuilders/indexBuilder';
import * as path from 'path';

import * as ur from "unhandled-rejection";


let handler = ur();

handler.on("unhandledRejection",function(err){
    throw err;
})


Run();
async function Run(){

    let filepath = path.resolve(__dirname,"../Framework");
    let index = new IndexBuilder(filepath);
    await index.build();

}

