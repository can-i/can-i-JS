import { DecoratorBuilder } from '../../Decorators/DecoratorBuilder';
import { MainController } from '../../Controllers/MainController';
import { ControllerMethodOptions } from '../../Controllers/Options/ControllerMethodOptions';
import GetControllerMethodOptions from '../../Controllers/GetControllerMethodOptions';
import ControllerOptions from '../../Controllers/Options/ControllerOptions';
import GetControllerOptions from '../../Controllers/GetControllerOptions';



export abstract class BaseControllerDecoratorBuilder extends DecoratorBuilder{

    protected getControllerOptions<T extends MainController>(c:{new():T}){
        GetControllerOptions().filter(o=>{
            return o.klass===c
        }).reduce((prev,next)=>prev||next,null as any) ||  new ControllerOptions(c);
    }

    protected getMethodOption<T extends MainController>(constructor:{new():T},name:string){
        return GetControllerMethodOptions().filter(option=>{
            return option.klass === constructor;
        }).filter(option=>{
            return option.method_name===name
        }).reduce((prev,next)=>prev||next,null as any) ||
        
        new ControllerMethodOptions(constructor,name);
    }

}