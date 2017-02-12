import * as express from "express";
import { Root } from '../../../Utilities/Internal';


export function AppGetter(){
    let root = Root();

    if(!root.App){
        root.App = express();
    }

    return root.App;
}





export default AppGetter;