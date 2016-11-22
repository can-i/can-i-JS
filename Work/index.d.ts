/// <reference types="core-js" />
export interface JobOption {
    ever?: number;
}
export interface JobSettings {
    target: Object;
    method_name: string;
    options: JobOption;
}
export declare const ControllerJobs: Object[];
export declare function Job(Options: JobOption): (target: Object, str: string) => void;
