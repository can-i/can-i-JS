
export namespace Framework.Contracts.FileSystem.Nodes {

    /**
     * This is meant to be the abstract class that will delete the node from a NodeSystem
     */
    export abstract class NodeRemover {

        abstract delete(data:any):Promise<boolean>;
    }
}

export default Framework.Contracts.FileSystem.Nodes.NodeRemover;