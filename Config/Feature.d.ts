import { AppGetter } from './AppGetter';
export declare class Feature extends AppGetter {
    protected enablerdisabler: SettingsEnableDisable;
    constructor(enablerdisabler: SettingsEnableDisable);
    private convert(f);
    enable(f: string): this;
    enabled(f: string): boolean;
    disable(f: string): this;
    disabled(f: string): boolean;
    on(...args: any[]): any;
    get(name: string, orMe: any): any;
    set(name: string, value: any): void;
}
export interface SettingsEnableDisable {
    enable(settings: string): void;
    disable(settings: string): void;
    enabled(settings: string): boolean;
    disabled(settings: string): boolean;
}
export declare class ExpressSettingsEnableDisable extends AppGetter implements SettingsEnableDisable {
    enable(settings: string): void;
    disable(settings: string): void;
    enabled(settings: string): boolean;
    disabled(settings: string): boolean;
}
export declare class ExpressSettingsEnableDisableLogger extends ExpressSettingsEnableDisable {
    enable(settings: string): void;
    enabled(settings: string): boolean;
    disable(settings: string): void;
}
export declare class FeatureFactory {
    static ExpressFeature(): Feature;
}
