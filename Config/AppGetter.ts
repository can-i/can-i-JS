import { App } from './../win/index';
import {Singleton} from "../IOC/Singleton";


@Singleton
export class AppGetter{
    get app(){
        return App();
    }
}