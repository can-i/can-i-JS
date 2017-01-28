import * as os from "os";
import * as path from "path";


import Limberjack from "limberjack";


let tmp = os.tmpdir()

let file_path = path.resolve(tmp,"can-i.log");

console.log(`Log File Path`);

