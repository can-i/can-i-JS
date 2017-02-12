import { MethodControllerDecoratorBuilder } from './MethodControllerDecoratorBuilder';




export function Post(path:string){
    let builder = new MethodControllerDecoratorBuilder("post");
    return builder.build(path);
}


export default Post;