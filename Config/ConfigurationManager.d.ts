import { AppGetter } from './AppGetter';
import { Feature } from "../Config/Feature";
export declare class ConfigurationManager extends AppGetter {
    private _feature;
    constructor(_feature: Feature);
    readonly feature: Feature;
}
