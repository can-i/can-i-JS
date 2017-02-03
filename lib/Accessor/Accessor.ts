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

    private get controller_accessor(){
        let root = this.root;
        let map: Map<ControllerCreator,ControllerAccessor>;
        if(!root.controller_accessor){
            map = root.controller_accessor = new Map<ControllerCreator,ControllerAccessor>();
        }else {
            map = root.controller_accessor;
        }

        return map;
    }

    /**
     * This will allow the framework to access 
     */

    private get root(){
        return ROOT;
    }

    GetControllerAccessor(Controller:ControllerCreator){
        let accessor = this.controller_accessor;
        if(!accessor.has(Controller)){
            accessor.set(Controller,new ControllerAccessor);
        }

        return accessor.get(Controller);
    }
}


export class ControllerAccessor extends Accessor{

}