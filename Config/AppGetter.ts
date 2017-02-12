import { App } from './../Win';
import {Singleton} from "../IOC/Singleton";
import * as Express from "express";
import { AppLog } from '../Utility/Log';

@Singleton
export class AppGetter{
    get app():Express.Application{
        AppLog.debug("getting App");
        return App();
    }
}