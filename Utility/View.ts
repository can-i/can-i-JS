import { Accessor } from './../win/Accessor';
export function View(target:Object,key:string,d:TypedPropertyDescriptor<any>){
    let original  = d.value;

    d.value = function(...args:string[]){
        this.internal_options.render = true;
        original.apply(this,args);
    }
    return d;
    
}