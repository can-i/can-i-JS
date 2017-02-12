
/**
 * This is meant to be the abstract class that will delete the node from a NodeSystem
 */
export abstract class NodeRemover {

    abstract delete(data: any):any;
}

export default NodeRemover;