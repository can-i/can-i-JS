import * as express from "express";
import { Internal } from '../../../DevTools/Utilities/Internal';


export function AppGetter(){
    let root = Internal();

    if(!root.App){
        root.App = express();
    }

    return root.App;
}


export default AppGetter;