
import Node from "./Node";
import ChildNode from "./ChildNode";
export namespace Framework.Contracts.FileSystem.Nodes{

    export abstract class ParentNode extends Node{

        /**
         * This will allow access to all of the child nodes that are available or an empty array
         */
        abstract GetChildren():Promise<ChildNode[]>;
    }


}



export default Framework.Contracts.FileSystem.Nodes.ParentNode;