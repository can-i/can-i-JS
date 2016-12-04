import { App } from './../Win';
import {Singleton} from "../IOC/Singleton";
import * as Express from "express";

@Singleton
export class AppGetter{
    get app():Express.Application{
        return App();
    }
}