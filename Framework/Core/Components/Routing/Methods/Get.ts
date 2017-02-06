import { GetControllerDecoratorBuilder } from './GetControllerDecoratorBuilder';



export function Get(path: string) {
    let builder = new GetControllerDecoratorBuilder()
    return builder.build(path);
}


export default Get;