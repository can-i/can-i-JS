import { AppGetter } from './AppGetter';
import {Singleton} from "../IOC/Singleton";
import {Feature} from "../Config/Feature";
import { AppLog } from '../Utility/Log';

@Singleton
export class ConfigurationManager extends AppGetter {
    constructor(private _feature:Feature) {
        super();
        AppLog.info("Booting Configuration manager");
    }

    get feature(){
        AppLog.debug("Getting features");
        return this._feature;
    }
}
