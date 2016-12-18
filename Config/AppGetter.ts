import { App } from './../Win';
import {Singleton} from "../IOC/Singleton";
import * as Express from "express";



export interface IAppGetter{
    app:Express.Application;
}

@Singleton
export class AppGetter implements IAppGetter{
    get app():Express.Application{
        return App();
    }
}