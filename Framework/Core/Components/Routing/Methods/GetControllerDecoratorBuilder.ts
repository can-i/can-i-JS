import { MethodControllerDecoratorBuilder } from './MethodControllerDecoratorBuilder';
import { MainController } from '../../Controllers/MainController';



export class GetControllerDecoratorBuilder<T extends MainController> extends MethodControllerDecoratorBuilder<T>{

    constructor() {
        super("get");
    }

}