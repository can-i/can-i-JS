
import { Event } from './../Event';
import {Singleton} from "../IOC/Singleton";
import { AppGetter } from './AppGetter';
import { AppLog } from '../Utility/Log';


const get_set_box:{[key:string]:any} = {};

@Singleton
export class Feature extends AppGetter {
    constructor() { 
        super();
        AppLog.debug("Booting Feature class");
    }

    private convert(f: string) {
        return `can-i feature ${f}`;
    }

    public enable(f: string) {
        this.app.enable(this.convert(f))
        return this;
    }

    public enabled(f: string) {
        return this.app.enabled(this.convert(f))
    }

    public disable(f: string) {
        this.app.disable(this.convert(f))
        return this;
    }

    public disabled(f: string) {
        return this.app.disabled(this.convert(f))
    }

    public on(...args:any[]){
        return (<any>Event.on)(...args);
    }


    public get(name:string,orMe:any){
        let _return = get_set_box[name];
        if(_return === undefined){
            return orMe;
        }else{
            return _return;
        }
    }


    // Feature.set("my_key_to_delete") :)
    public set(name:string,value:any){
        get_set_box[name] = value;
    }
}