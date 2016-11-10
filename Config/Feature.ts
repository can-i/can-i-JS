import { Event } from './../Event/index';
import {Singleton} from "../IOC/Singleton";
import { AppGetter } from './AppGetter';

@Singleton
export class Feature extends AppGetter {
    constructor() { 
        super();
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
}