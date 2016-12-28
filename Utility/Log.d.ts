import { ILimberJack } from "limberjack/lib/limberjack";
export declare const AppLog: ILimberJack;
export declare const RouteLog: ILimberJack;
export declare const Logger: {
    Application: (...args: any[]) => void;
    Job: (...args: any[]) => void;
    AppError: (...args: any[]) => void;
    Main: (...args: any[]) => void;
};
