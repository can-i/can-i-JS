import LimberJack from 'limberjack';
export declare const AppLog: LimberJack;
export declare const RouteLog: LimberJack;
export declare const Logger: {
    Application: (...args: any[]) => void;
    Job: (...args: any[]) => void;
    AppError: (...args: any[]) => void;
    Main: (...args: any[]) => void;
};
