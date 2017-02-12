import { BaseControllerDecoratorBuilder } from './BaseControllerDecoratorBuilder';
import { MainController } from '../../Controllers/MainController';
import { Constructor } from '../../Types/Generic/Constructor';
import { MethodKey } from '../../Types/Routing/MethodKeys';






export class MethodControllerDecoratorBuilder<T extends MainController> extends BaseControllerDecoratorBuilder{


    get type(){
        return this._type.toUpperCase();
    }

    constructor(private _type:MethodKey){
        super()
    }
    onConstructor(construct:Constructor<T>){

    }
    onMethod(target:{constructor:Constructor<T>},key:string,pd:PropertyDescriptor){

        let [path]:[string] =  this.params as [string];
        const mo = this.getMethodOption(target.constructor,key);
        mo.method_type=this.type;
        mo.method_path = path;
        return pd;
    }
}