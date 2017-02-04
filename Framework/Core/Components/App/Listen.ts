import AppGetter from './AppGetter';
import { Root } from '../../../Utilities/Internal';




export async function Listen(path:string,callback?:Function)
export async function Listen(port:number,hostname?:string,max_backlog?:number,callback?:Function)
export async function Listen(...args:any[]){
    let App = AppGetter();
    let root = Root();
    let [arg1,arg2,arg3,arg4] = args;
    root.Server = App.listen(arg1,arg2,arg3,arg4);
    
}