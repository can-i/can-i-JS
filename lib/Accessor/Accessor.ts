import {Controller} from "../Controller/Controller";
import ROOT from '../App/root';

const uuid = require("uuid/v4");

export type ControllerCreator = {new():Controller};

export class Accessor{
    readonly id:number;

    constructor(){
        this.id = uuid();
    }
}

export class AccessorManager{
    private static ControllerAccessor = new Map<ControllerCreator,any>();


    private get controller_accessor(){
        let root = this.root;
        if(!root.controller_accessor){
            root.controller_accessor = 
        }
        return result;
    }

    /**
     * This will allow the framework to access 
     */

    private get root(){
        return ROOT;
    }

    GetControllerAccessor(Controller:ControllerCreator){
        let accessor = this.controller_accessor;
    }





    
}


export class ControllerAccessor extends Accessor{

}