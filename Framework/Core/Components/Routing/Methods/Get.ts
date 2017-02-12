import { GetControllerDecoratorBuilder } from './GetControllerDecoratorBuilder';


/**
 * The Standard Get methods you are use to inside Express
 */
export function Get(path: string) {
    let builder = new GetControllerDecoratorBuilder()
    return builder.build(path);
}


export default Get;