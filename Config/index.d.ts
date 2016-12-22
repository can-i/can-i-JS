import 'reflect-metadata';
import { ConfigurationManager } from './ConfigurationManager';
import { Configuration } from "./Configuration";
export declare const configurationManager: ConfigurationManager;
export declare function Configure(options?: Partial<Configuration>): void;
