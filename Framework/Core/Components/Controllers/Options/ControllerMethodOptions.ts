import { ControllerOptions } from './ControllerOptions';
import { MainController } from '../MainController';


export class ControllerMethodOptions<T extends MainController> extends ControllerOptions<T>{

    constructor(klass:{new():T},name:string){
        super(klass);
        this.method_name=name;
    }
    method_type:string;
    method_name:string;
}