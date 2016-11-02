import { AppGetter } from './AppGetter';
import {Singleton} from "../IOC/Singleton";
import {Feature} from "../Config/Feature";

@Singleton
export class ConfigurationManager extends AppGetter {
    constructor(private _feature:Feature) {
        super();
    }

    get feature(){
        return this._feature;
    }
}
