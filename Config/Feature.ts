
import { Event } from './../Event';
import {Singleton} from "../IOC/Singleton";
import { AppGetter } from './AppGetter';
import { AppLog } from '../Utility/Log';
import { App } from '../Win/index';
import { Constant } from '../Win/Constant';


const get_set_box:{[key:string]:any} = Constant.set("GLOBAL_KEY_GET_SET_BOX",{});


export class Feature extends AppGetter {
    constructor(protected enablerdisabler:SettingsEnableDisable) { 
        super();
        AppLog.debug("Booting Feature class");
    }

    private convert(f: string) {
        return `can-i feature ${f}`;
    }

    public enable(f: string) {
        this.enablerdisabler.enable(this.convert(f));
        return this;
    }

    public enabled(f: string) {
        return this.enablerdisabler.enabled(this.convert(f))
    }

    public disable(f: string) {
        this.enablerdisabler.disable(this.convert(f))
        return this;
    }

    public disabled(f: string) {
        return this.enablerdisabler.disabled(this.convert(f))
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



//This allows me to break and use a different settings configuration


export interface SettingsEnableDisable{
    enable(settings:string):void;
    disable(settings:string):void;
    enabled(settings:string):boolean;
    disabled(settings:string):boolean;
}



export class ExpressSettingsEnableDisable extends AppGetter implements SettingsEnableDisable{
    enable(settings:string){
        this.app.enable(settings);
    }

    disable(settings:string){
        this.app.disable(settings);
    }

    enabled(settings:string){
        return this.app.enabled(settings);
    }

    disabled(settings:string){
        return this.app.disabled(settings);
    }
}


export class ExpressSettingsEnableDisableLogger extends ExpressSettingsEnableDisable{
    enable(settings:string){
        console.log(`enabling ${settings}`);
        super.enable(settings);
    }

    enabled(settings:string){
        let r = super.enabled(settings);
        console.log(`${settings} is ${r?'enabled':'disabled'}`)
        return r;
    }

    disable(settings:string){
        console.log(`disabling ${settings}`)
        super.disable(settings);
    }
}




export class FeatureFactory{
    static ExpressFeature(){
        return new Feature(new ExpressSettingsEnableDisable());
    }
}